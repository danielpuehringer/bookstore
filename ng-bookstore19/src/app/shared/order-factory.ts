import { Order } from './order';
import {State} from "./state";

export class OrderFactory {

    static empty(): Order {
        return new Order(
            null,//id
            new Date(), //order_date
            0, //total_price
            0, //vat
            0,//user_id
            [null
                /*{//book
                    id: null,
                    isbn: '',
                    title: '',
                    authors: [],
                    published: new Date(),
                    user_id: 0,
                    subtitle: '',
                    rating: 0,
                    images: [{id: 0, url: '', title: ''}],
                    description: '',
                    net_price: 0
                }*/
            ],
            [
                {//state
                    id: null,
                    comment: '',
                    order_id: null
                }
            ]);
    }

    static fromObject(rawOrder: any): Order {
        return null;
    }
}