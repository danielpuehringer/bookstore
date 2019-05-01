import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/shopping-cart.service";
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bs-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {

  public cartBooks: Book[];
  public totalPrices: {net: number, gross: number, vat: number};

  constructor(private scs: ShoppingCartService, private  authService: AuthService, private router: Router) {
    this.cartBooks = scs.cartBooks;
  }

  ngOnInit() {
    this.scs.syncWithJSON().subscribe(res => this.cartBooks = res);
    this.scs.syncPrices().subscribe(res => this.totalPrices = res);
  }

  clearStorage(){
    this.scs.clearStorage();
    this.cartBooks = this.scs.cartBooks; //manually refreshing
  }

  buyBooks(){
    if(confirm("Do you really want to buy the cart?")){
      this.scs.createOrder();
      this.router.navigate(['./orders']);
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
