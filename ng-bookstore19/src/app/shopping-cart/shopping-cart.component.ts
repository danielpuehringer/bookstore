import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/shopping-cart.service";
import {Book} from "../shared/book";

@Component({
  selector: 'bs-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {

  public cartBooks: Book[];

  constructor(private scs: ShoppingCartService) { }

  ngOnInit() {
    this.scs.getAll().subscribe(res => this.cartBooks = res);
  }

}
