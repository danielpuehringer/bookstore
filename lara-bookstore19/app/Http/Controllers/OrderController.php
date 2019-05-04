<?php

namespace App\Http\Controllers;

use App\Book;
use App\Order;
use App\State;
use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    //GET: orders
    public function index(){
        //load all orders and relations with eager loading

        $orders = Order::with(['states', 'books'])->get();
        return $orders;
    }

    //GET: orders/user/{id}
    public function findByUserId(string $userId) {
        $ordersOfUser = Order::with(['states', 'books'])->where('user_id', $userId)->get();
        return $ordersOfUser;
    }


    //GET: order/{id}
    public function findByOrderId(string $orderId) { //function is not mandatory
        $order = Order::with(['states', 'books'])->where('id', $orderId)->first();
        return $order;
    }

    public function update(Request $request, string $order_id) : JsonResponse{
        DB::beginTransaction();
        try {
            $order = Order::with(['states', 'books'])
                ->where('id', $order_id)->first();
            if ($order != null) {
                $request = $this->parseRequest($request);
                $order->update($request->all());

                //delete all old states
                $order->states()->delete();
                if(isset($request['states']) && is_array($request['states'])) {
                    foreach ($request['states'] as $s) {
                        $state = State::firstOrNew(['comment' => $s['comment'], 'state' => $s['state'], 'order_id' => $order_id]);
                        $order->states()->save($state);
                    }
                    //TODO investigate further
                }
            }

            DB::commit();
            $order1 = Order::with(['states', 'books'])
                ->where('id', $order_id)->first();
            // return a vaild http response
            return response()->json($order1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating book failed: " . $e->getMessage(), 420);

        }
    }

    public function updateStates(Request $request, string $order_id) : JsonResponse{

    }


    //POST: orderController@save
    public function save(Request $request) : JsonResponse {
        $request = $this->parseRequest($request);
        DB::beginTransaction();
        try{
            $order = Order::create($request->all());
            $order->save();

            //STATES
            $receivedOrder = Order::where('user_id', $request['user_id'])->first();
            $orderId = $receivedOrder['id'];

            if(isset($request['states']) && is_array($request['states'])) {
                foreach ($request['states'] as $s) {
                    $state = State::firstOrNew(['comment' => $s['comment'], 'state' => $s['state'], 'order_id' => $orderId]);
                    $order->states()->save($state);
                }
            }

            //BOOKS
            if(isset($request['books']) && is_array($request['books'])) {
                foreach ($request['books'] as $b){
                    $book = Book::where('isbn', $b['isbn'])->first();
                    $order->books()->save($book);
                }
            }

            DB::commit();
            // return a vaild http response
            $returnableOrder = $order->with(['states', 'books'])->where('id', $order['id'])->first();
            return response()->json($returnableOrder, 201);
        }
        catch(\Exception $e){
            DB::rollback();
            return response()->json("saving order failed: " . $e->getMessage(), 420);
        }
        return $request;
    }

    public function saveStateToOrder(Request $request, $order_id): JsonResponse {
        $order = Order::with(['states'])->where('id', $order_id)->first();
        DB::beginTransaction();

        try {
            $state = State::firstOrNew(['comment' => $request['comment'], 'state' => $request['state'], 'order_id' => $order_id]);
            $order->states()->save($state);

            DB::commit();
            $order2 = Order::with(['states'])->where('id', $order_id)->first();
            return response()->json($order2);
        }catch(\Exception $e){
            DB::rollback();
            return response()->json('Error occured: '. $e->getMessage(), 404);
        }
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
