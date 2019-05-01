import { Component, OnInit } from '@angular/core';
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'bs-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  public orders: Order[];

  constructor(private os: OrderService) { }

  ngOnInit() {
    this.os.getAllOrders().subscribe(res => this.orders = res);
  }

}
