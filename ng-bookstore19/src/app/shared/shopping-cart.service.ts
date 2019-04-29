import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Book} from "./book";
import {BookFactory} from "./book-factory";
import {AuthService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  private cartBooks: Book[] = new Array();

  private totalNet: number = 0;
  private totalGross: number = 0;

  private vat = 20;//tax

  constructor(private auth: AuthService) {
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
        const returnedBook : Book = BookFactory.fromObject(currentBook);
        this.cartBooks.push(returnedBook);
      }
    }
    this.syncPrices();
    return of(this.cartBooks);
  }

  checkIfBookAlreadyExistsInCart(cartBook: Book): boolean{
    //TODO implement logic
    return true;
  }


  syncPrices(): Observable<{net: number, gross: number, vat: number}>{
    this.totalNet = 0;
    for(let cartBook of this.cartBooks) {

      this.totalNet += cartBook.net_price;
    }
    this.totalGross = this.totalNet * (1+(this.vat/100));//calc --> if vat=20 => net + 1,2
    this.totalGross = parseFloat(this.totalGross.toFixed(2));//rounding for 2 behind comma
    return of({net: this.totalNet, gross: this.totalGross, vat: this.vat});
  }

  createOrder() {
    this.syncWithJSON();//hopefully not needed
    console.log("order will be created with:");
    console.log(this.cartBooks);
    console.log(this.auth.getCurrentUserId());
  }
}
