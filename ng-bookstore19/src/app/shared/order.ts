import {State} from "./state";
import {Book} from "./book";
export class Order {
    constructor(
        public id: number,
        public order_date: Date,
        public total_price: number,
        public vat: number,
        public user_id: number,
        public books: Book[],
        public states: State[]
    ){

    }
}
