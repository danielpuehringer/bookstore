import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "./author";
import {retry} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

    private api= "http://bookstore19.s1610456027.student.kwmhgb.at/api";

  constructor(private http: HttpClient) { }

  //Observable<Array<Author>> did not work
  getAllAuthors(): Observable<any> {
      return this.http.get(`${this.api}/authors`).pipe(retry(3));
  }

}
