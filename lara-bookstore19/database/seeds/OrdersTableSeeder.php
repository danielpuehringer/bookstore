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
        $order = new App\Order;
        $order->order_date = new DateTime();
        $order->total_price = 0.01;

        $user = \App\User::all()->first();
        $order->user()->associate($user);//adding user
        $order->save();//save in DB

        $state1 = new App\State;
        $state1->comment = 'Init State Setup';
        $state1->state = 'open';
        $state1->orders()->associate($order);
        $state1->save();

        $state1 = new App\State;
        $state1->comment = 'Second State';
        $state1->state = 'paid';
        $state1->orders()->associate($order);
        $state1->save();
    }
}
