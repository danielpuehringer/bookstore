import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/shopping-cart.service";
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'bs-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {

  public cartBooks: Book[];
  public totalPrices: {net: number, gross: number};

  constructor(private scs: ShoppingCartService, private  authService: AuthService) { }

  ngOnInit() {
    this.scs.syncWithJSON().subscribe(res => this.cartBooks = res);
    this.scs.syncPrices().subscribe(res => this.totalPrices = res);
  }

  clearStorage(){
    this.scs.clearStorage();
    console.log(this.cartBooks);
  }

  buyBooks(){
    if(confirm("Do you really want to buy the cart?")){
      this.scs.createOrder();
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
