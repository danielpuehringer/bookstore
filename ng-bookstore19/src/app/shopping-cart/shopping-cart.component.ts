import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/shopping-cart.service";
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {Order} from "../shared/order";

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
        const userId = this.authService.getCurrentUserId();
      let order = new Order(null, new Date(), this.totalPrices.gross,
      this.totalPrices.vat, userId, null, null);
      this.scs.createOrder(order);

      this.router.navigate(['./order/'+ userId]);
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
