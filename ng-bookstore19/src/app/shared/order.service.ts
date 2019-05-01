import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/internal/operators";
import {Order} from "./order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  //private orders: Order[] = new Array();
  //private ordersOfUser: Order[] = new Array();

  private api= "http://bookstore19.s1610456027.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {

  }

  getAllOrders(): Observable<Array<Order>> {
    return this.http.get(`${this.api}/orders`)
        .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
