import { Order } from './order';

export class OrderFactory {

    static empty(): Order {
        return new Order(
            null,//id
            null, //order_date
            0, //total_price
            0, //vat
            0,//user_id
            null,
            [
                {//state
                    id: null,
                    comment: '',
                    state: 'open',
                    order_id: 1
                }
            ]);
    }

    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            typeof(rawOrder.order_date) === 'string' ?
                new Date(rawOrder.order_date) : rawOrder.order_date,
            rawOrder.total_price,
            rawOrder.vat,
            rawOrder.user_id,
            rawOrder.books,
            rawOrder.states
        );
    }
}