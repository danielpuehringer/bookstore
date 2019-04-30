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
    public function save(Request $request) : JsonResponse {
        $request = $this->parseRequest($request);
        DB::beginTransaction();
        try{
            $order = Order::create($request->all());

            //arrays welche im with übergeben wurden alle auflisten
            //states
            //books
            //TODO

            DB::commit();
            // return a vaild http response
            return response()->json($order, 201);
        }
        catch(\Exception $e){
            DB::rollback();
            return response()->json("saving order failed: " . $e->getMessage(), 420);
        }



        return $request;
    }

    /**
     * modify / convert values if needed
     */
    private function parseRequest(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }
}
