import { Component, OnInit } from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../shared/order.service";
import {Order} from "../../shared/order";
import {AuthService} from "../../shared/authentication.service";

@Component({
  selector: 'bs-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

    public ordersOfUser: Order[]= new Array();

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private os: OrderService,
      private auth: AuthService
    ) { }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.os.getOrdersOfUser(params['user_id']).subscribe(res => this.ordersOfUser = res);
    }

}
