import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError, of} from "rxjs";
import { ajax } from 'rxjs/ajax';
import {catchError, retry, map} from "rxjs/internal/operators";
import {Order} from "./order";
import {State} from "./state";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private api= "http://bookstore19.s1610456027.student.kwmhgb.at/api";

  getAllOrders(): Observable<Array<Order>> {
    return this.http.get(`${this.api}/orders`)
        .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getOrdersOfUser(user_id: number): Observable<Array<Order>> {
      return this.http.get(`${this.api}/orders/user/${user_id}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(order: Order): Observable<any> {
      return this.http.post(`${this.api}/order`, order).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(order: Order): Observable<any> {
      console.log("order:");
      console.log(order);
      return this.http.put(`${this.api}/order/${order.id}`, order)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateStatus(state: State, order_id: number): Observable<any> {
      return this.http.post(`${this.api}/order/${order_id}/state`, state);
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
