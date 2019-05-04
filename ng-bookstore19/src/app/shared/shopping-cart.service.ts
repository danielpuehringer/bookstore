import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Book} from "./book";
import {BookFactory} from "./book-factory";
import {AuthService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/internal/operators";
import {Order} from "./order";

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  public cartBooks: Book[] = new Array();

  public totalNet: number = 0;
  public totalGross: number = 0;

    private api= "http://bookstore19.s1610456027.student.kwmhgb.at/api";

  public vat = 20;//tax

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  add(cartBook: Book): boolean {
    if(this.checkIfBookAlreadyExistsInCart(cartBook)){
      this.cartBooks.push(cartBook);
      localStorage.setItem(cartBook.isbn, JSON.stringify(cartBook));

      for(let i = 0; i < localStorage.length; i++){
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
    //manually storing items to fill them in after clearing whole local storage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin");

    localStorage.clear();
    if (token && userId && isAdmin){
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAdmin", isAdmin);
    }
    this.syncWithJSON();
  }

  deleteItemById(itemId){
      localStorage.removeItem(itemId);
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

    private errorHandler(error: Error | any): Observable<any>{
        return throwError(error);
    }
}
