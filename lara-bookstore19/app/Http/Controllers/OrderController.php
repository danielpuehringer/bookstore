<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    //orders
    public function index(){
        //load all orders and relations with eager loading

        $orders = Order::with(['states', 'books'])->get();
        return $orders;
    }

    //orders/user/{id}
    public function findByUserId(string $userId) {
        $ordersOfUser = Order::with(['states', 'books'])->where('user_id', $userId)->get();
        return $ordersOfUser;
    }


    //order/{id}
    public function findByOrderId(string $orderId) { //function is not mandatory
        $order = Order::with(['states', 'books'])->where('id', $orderId)->first();
        return $order;
    }


    //POST: orderController@save
}
