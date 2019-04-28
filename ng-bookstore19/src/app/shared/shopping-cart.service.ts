import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Book} from "./book";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private testBook: Book = new Book(10, "12345645678", "TitleöÖ", new Array(), new Date(), 5);
  private cartBooks: Book[] = new Array(this.testBook);

  constructor() {
    //localStorage.setItem(this.testBook.isbn, JSON.stringify(this.testBook));
    //let item = localStorage.getItem(this.testBook.isbn);
    //console.log("important");
    //console.log(JSON.parse(item));
  }

  add(cartBook: Book): boolean {
    if(this.checkIfBookAlreadyExistsInCart(cartBook)){
      this.cartBooks.push(cartBook);
      localStorage.setItem(cartBook.isbn, JSON.stringify(cartBook));

      console.log("test");
      for(let i = 3; i < localStorage.length; i++){
        let value = localStorage.getItem(localStorage.key(i));
        if (value[0] === "{") {
          value = JSON.parse(value);
        }
        console.log(value);
      }

      this.getAllBooksFromJSON();

      return true;
    }else{
      return false;
    }

  }

  getAllBooksFromJSON(): Book[] {
    //console.log("array before: ");
    //console.log(this.cartBooks);
    this.cartBooks = new Array();
    for(let i = 0; i < localStorage.length; i++){
      let currentBook = localStorage.getItem(localStorage.key(i));
      if(currentBook[0] === "{"){
        currentBook = JSON.parse(currentBook);
        //console.log("Current parsed book:");
        //console.log(currentBook);
        //TODO maybe reassigne here?
        this.cartBooks.push(currentBook);
        //console.log("current array");
        //console.log(this.cartBooks);
      }
    }
    //console.log("array after: ");
    //console.log(this.cartBooks);
    return this.cartBooks;
  }

  getAll(): Observable<Array<Book>> {
    return of(this.getAllBooksFromJSON());
  }

  checkIfBookAlreadyExistsInCart(cartBook: Book): boolean{
    //TODO implement logic
    return true;
  }
}
