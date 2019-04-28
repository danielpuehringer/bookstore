import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shared/book-factory";
import {AuthService} from "../shared/authentication.service";
import {ShoppingCartService} from "../shared/shopping-cart.service";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  book: Book = BookFactory.empty();

  constructor(
      private bs: BookStoreService,
      private route: ActivatedRoute,
      private router: Router,
      public authService: AuthService,
      private scs: ShoppingCartService
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn']).subscribe(b => this.book=b);
  }

  getRating(num :number){
    return new Array(num);
  }

  removeBook(){
    if(confirm('Really want to delete the book?')){
      this.bs.remove(this.book.isbn).subscribe(
          res => this.router.navigate(['../'], {relativeTo: this.route})
      );
    }
  }

  addBookToCart(){
    this.scs.add(this.book);
  }

}
