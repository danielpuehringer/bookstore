import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../shared/order.service";
import {Order} from "../../shared/order";
import {AuthService} from "../../shared/authentication.service";

@Component({
    selector: 'bs-admin-order-list',
    templateUrl: './admin-order-list.component.html',
    styles: []
})
export class AdminOrderListComponent implements OnInit {

    public orders: Order[] = new Array();

    constructor(private os: OrderService, private auth: AuthService) { }

    ngOnInit() {
        this.os.getAllOrders().subscribe(res => this.orders = res);
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    isAdmin(): boolean {
        return this.auth.isAdmin();
    }
}
