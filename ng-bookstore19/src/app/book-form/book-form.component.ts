import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { BookFormErrorMessages } from './book-form-error-messages';
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {Book, Image} from "../shared/book";
import {BookValidators} from "../shared/book-validators";

@Component({
    selector: 'bs-book-form',
    templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
    bookForm: FormGroup;
    book = BookFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingBook = false;
    images: FormArray;

    constructor(private fb: FormBuilder, private bs: BookStoreService,
                private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const isbn = this.route.snapshot.params['isbn'];
        if (isbn) {
            this.isUpdatingBook = true;
            this.bs.getSingle(isbn).subscribe(book => {
                this.book = book;
                this.initBook();//is needed because this is async
            });
        }
        this.initBook();
    }

    initBook() {
        this.buildThumbnailsArray();

        this.bookForm = this.fb.group({
            id: this.book.id,
            title: [this.book.title, Validators.required],
            subtitle: this.book.subtitle,
            isbn: [this.book.isbn, [
                Validators.required,
                //Validators.minLength(10),
                //Validators.maxLength(13)
                BookValidators.isbnFormat
            ]],
            description: this.book.description,
            rating: [this.book.rating,[
                Validators.min(0),
                Validators.max(10)
            ]],
            //authors: this.authors,
            images: this.images,
            published: new Date(this.book.published),
            net_price: [this.book.net_price, [
                Validators.required,
                Validators.min(0.00),
                Validators.max(9999.99)
            ]]
        });
        this.bookForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

    buildThumbnailsArray() {
        console.log(this.book.images);
        //if(this.book.images.length == 0){ //if new book had no images -> but no in edit mode
        //    this.book.images.push(new Image(0,'',''))
        this.images = this.fb.array(
            this.book.images.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    url: this.fb.control(t.url),
                    title: this.fb.control(t.title)
                })
            ), BookValidators.atLeastOneImage
        );
        console.log(this.images);
    }

    addThumbnailControl() {
        this.images.push(this.fb.group({ url: null, title: null }));
    }

    removeThumbnailControl(index){
        this.images.removeAt(index);
    }

    submitForm() {
        // filter empty values
        this.bookForm.value.images = this.bookForm.value.images.filter(thumbnail => thumbnail.url);

        const book: Book = BookFactory.fromObject(this.bookForm.value);
        //all attributes of book (incl. net_price) have to be in that Book Factory
        //deep copy  - did not work without??
        book.images = this.bookForm.value.images;
        console.log("Form Component: ");//TODO delete
        console.log(book);//TODO delete

        //just copy the authors
        book.authors = this.book.authors;

        if (this.isUpdatingBook) {
            this.bs.update(book).subscribe(res => {
                this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
            });
        } else {
            book.user_id = 1;// jsut for testing
            console.log(book);
            this.bs.create(book).subscribe(res => {
                this.book = BookFactory.empty();
                this.bookForm.reset(BookFactory.empty());
                this.router.navigate(['../books'], { relativeTo: this.route });
            });
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of BookFormErrorMessages) {
            const control = this.bookForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}