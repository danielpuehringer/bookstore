<?php

use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $order1 = new App\Order();
        $order1->order_date = new DateTime();
        $order1->total_price = 0.01;
        $order1->vat = 10;

        $user = \App\User::all()->first();
        $order1->user()->associate($user);//adding user
        $order1->save();//save in DB

        $state1 = new App\State;
        $state1->comment = 'Init State Setup';
        $state1->state = 'open';
        $state1->order()->associate($order1);
        $state1->save();

        $state2 = new App\State;
        $state2->comment = 'Second State';
        $state2->state = 'paid';
        $state2->order()->associate($order1);
        $state2->save();

        $books = \App\Book::all()->pluck('id');
        $order1->books()->sync($books);


        //second order
        $order2 = new App\Order();
        $order2->order_date = new DateTime();
        $order2->total_price = 9.01;
        $order2->vat = 20;

        $user = \App\User::all()->first();
        $order2->user()->associate($user);//adding user
        $order2->save();//save in DB

        $state3 = new App\State;
        $state3->comment = 'Init State Setup';
        $state3->state = 'open';
        $state3->order()->associate($order2);
        $state3->save();

        $state4 = new App\State;
        $state4->comment = 'Unhappy customer';
        $state4->state = 'canceled';
        $state4->order()->associate($order2);
        $state4->save();

        $books = \App\Book::all()->pluck('id');
        $order2->books()->sync($books);



        //third order
        $order3 = new App\Order();
        $order3->order_date = new DateTime();
        $order3->total_price = 8.78;
        $order3->vat = 20;

        $user = \App\User::all()->last();
        $order3->user()->associate($user);//adding user
        $order3->save();//save in DB

        $state5 = new App\State;
        $state5->comment = 'Init State Setup';
        $state5->state = 'open';
        $state5->order()->associate($order3);
        $state5->save();

        $state6 = new App\State;
        $state6->comment = 'Very happy customer';
        $state6->state = 'delivered';
        $state6->order()->associate($order3);
        $state6->save();

        $books = \App\Book::all()->pluck('id');
        $order3->books()->sync($books);
    }
}
