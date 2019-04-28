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
  }

  add(cartBook: Book): boolean {
    if(this.checkIfBookAlreadyExistsInCart(cartBook)){
      this.cartBooks.push(cartBook);
      localStorage.setItem(cartBook.isbn, JSON.stringify(cartBook));

      for(let i = 3; i < localStorage.length; i++){
        let value = localStorage.getItem(localStorage.key(i));
        if (value[0] === "{") {
          value = JSON.parse(value);
        }
      }
      this.syncWithJSON();
      return true;
    }else{
      return false;
    }

  }

  clearStorage() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId){
      console.log("exist");
    }

    localStorage.clear();

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    this.syncWithJSON();
  }

  syncWithJSON(): Observable<Array<Book>> {
    this.cartBooks = new Array();
    for(let i = 0; i < localStorage.length; i++){
      let currentBook = localStorage.getItem(localStorage.key(i));
      if(currentBook[0] === "{"){
        currentBook = JSON.parse(currentBook);

        //TODO maybe reassigne here? to avoid error
        this.cartBooks.push(currentBook);
      }
    }
    return of(this.cartBooks);
  }

  checkIfBookAlreadyExistsInCart(cartBook: Book): boolean{
    //TODO implement logic
    return true;
  }

  createOrder() {
    console.log("order will be created with:");
    console.log(this.cartBooks);
  }
}
