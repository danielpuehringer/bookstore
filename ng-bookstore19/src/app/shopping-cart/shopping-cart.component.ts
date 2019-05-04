import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/shopping-cart.service";
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {Order} from "../shared/order";
import {OrderFactory} from "../shared/order-factory";
import {State} from "../shared/state";
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'bs-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {

  public cartBooks: Book[];
  public totalPrices: {net: number, gross: number, vat: number};

  constructor(private scs: ShoppingCartService, private  authService: AuthService, private router: Router, private os: OrderService) {
    this.cartBooks = scs.cartBooks;
  }

  ngOnInit() {
    this.scs.syncWithJSON().subscribe(res => this.cartBooks = res);
    this.scs.syncPrices().subscribe(res => this.totalPrices = res);
  }

  clearStorage(){
    this.scs.clearStorage();
    this.cartBooks = this.scs.cartBooks; //manually refreshing
      this.totalPrices = {"net": this.scs.totalNet, "gross": this.scs.totalGross, "vat": this.scs.vat};
  }

  buyBooks(){
    if(confirm("Do you really want to buy the cart?")){
        const userId = this.authService.getCurrentUserId();

        if(this.cartBooks.length <= 0){
            alert("Empty Cart, buying not possible");
        }else{
            let states: State[] = new Array(new State(null, 'Init State', "open", null));
            let order = new Order(null, undefined, this.totalPrices.gross,
                this.totalPrices.vat, userId, this.cartBooks, states);
            order = OrderFactory.fromObject(order);
            this.os.create(order).subscribe(res => {
                this.router.navigate(['./order/'+ userId]);
            });
        }


    }
    this.clearStorage();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getCurrentUserId(): number {
      return this.authService.getCurrentUserId();
  }

}
