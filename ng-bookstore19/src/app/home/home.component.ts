import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) { }

  bookSelected(book: Book){
    this.router.navigate(['../books', book.isbn], {relativeTo: this.route});
  }

  ngOnInit() {
  }

  isAdmin(): boolean {
      return this.auth.isAdmin();
  }
}
