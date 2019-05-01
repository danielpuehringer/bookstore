export class Order {
    constructor(
        public id: number,
        public order_date: Date,
        public total_price: number,
        public vat: number,
        public user_id: number,
        public book_id: number[],
        public states: number[]
    )
}
