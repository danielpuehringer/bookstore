import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Author} from "../shared/author";
import {Book} from "../shared/book";
import {Image} from "../shared/image";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {

  public books: Book[];

  constructor(private bs: BookStoreService, private  authService: AuthService) {
  }

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.books = res);
  }

  isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
  }
}
