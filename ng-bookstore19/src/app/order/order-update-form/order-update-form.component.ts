import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../shared/order";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {OrderService} from "../../shared/order.service";
import {State} from "../../shared/state";

@Component({
  selector: 'bs-order-update-form',
  templateUrl: './order-update-form.component.html',
  styles: []
})
export class OrderUpdateFormComponent implements OnInit {

  @Input()
  order: Order;

  stateForm: FormGroup;

  constructor(private fb: FormBuilder, private os: OrderService) { }

  ngOnInit() {
    this.initOrder();
  }

  submitForm() {
    const state = new State(undefined, this.stateForm.value.comment, this.stateForm.value.state, this.order.id);
    this.order.states.push(state);
    this.os.updateStatus(state, this.order.id).subscribe((res) => {
        this.order = res;
    });
  }

  initOrder() {
    this.stateForm = this.fb.group({
      state: this.order.states[this.order.states.length-1].state,
        comment: ''
    });
    this.stateForm.statusChanges.subscribe(() => {console.log("change detected")});
  }
}
