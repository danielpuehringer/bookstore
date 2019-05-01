import { Component, OnInit } from '@angular/core';
import {OrderService} from "../shared/order.service";
import {Order} from "../shared/order";
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'bs-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  public orders: Order[] = new Array();
  public ordersOfUser: Order[] = new Array();

  constructor(private os: OrderService, private auth: AuthService) { }

  ngOnInit() {
    this.os.getAllOrders().subscribe(res => this.orders = res);
    if(this.auth.getCurrentUserId()){
        this.syncOrdersOfUser(this.auth.getCurrentUserId());
    }
    this.os.getOrdersOfUser(1);
  }

  //TODO
  checkIfOrdersExists(): boolean{
      return this.orders.length > 0;
  }

  isLoggedIn(): boolean {
      return this.auth.isLoggedIn();
  }

  isAdmin(): boolean {
      let isAdmin : boolean = this.auth.isAdmin();
      return isAdmin;
  }

  syncOrdersOfUser(id: number): void {
      let ordersOfUser = new Array();
      for(let order of this.orders){
          if(order.user_id == id){
              ordersOfUser.push(order);
          }
      }
      this.ordersOfUser = ordersOfUser;
  }



}
