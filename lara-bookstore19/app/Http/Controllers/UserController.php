<?php

namespace App\Http\Controllers;

use App\User;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function index(){
        $users = User::with(['orders', 'books'])->get();
        return $users;
    }

    //find user
    public function findByUserId($id){
        $user = User::where('id', $id)->with(['orders', 'books'])->first();
        return $user != null ?
            response()->json($user , 200)//INFO: if this causes trouble, change back to "return $user;"
            : response()->json('user with id '.$id. ' does not exist', 404);
    }

    //create new user
    public function save(Request $request) : JsonResponse {
        //$request = $this->parseRequest($request);

        DB::beginTransaction();
        try {
            $user = User::create($request->all());
            DB::commit();
            return response()->json($user, 201);
        }catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving user failed: ". $e->getMessage(), 420);
        }
    }

    //update
    public function update(Request $request, string $id) : JsonResponse {
        DB::beginTransaction();//TODO
        $user = User::where('id', $id)->with(['orders', 'books'])->first();
        //$request = $this->parseRequest($request);
        $user->update($request->all());

        //TODO does not work
        /*if (isset($request['orders']) && is_array($request['orders'])) {
            foreach ($request['orders'] as $ord) {
                $order = Order::firstOrNew(['order_date'=>$ord['order_date'],'total_price'=>$ord['total_price'], 'vat'=>$ord['vat'], 'user_id', $ord['user_id']]);
                $user->orders()->save($order);
            }
        }*/

        //TODO does not work
        /*if (isset($request['books']) && is_array($request['books'])) {
            foreach ($request['books'] as $b) {
                $book = Book::firstOrNew(
                    ['order_date'=>$ord['order_date'],
                        'total_price'=>$ord['total_price'],
                        'vat'=>$ord['vat'],
                        'user_id',
                        $ord['user_id']]);
                $user->orders()->save($order);
            }
        }*/

        $user1 = User::where('id', $id)->with(['orders', 'books'])->first();
        // return a vaild http response
        return response()->json($user1, 201);
    }

    /*
     * public function update(Request $request, string $isbn): JsonResponse {
        DB::beginTransaction();
        try {
            $book = Book::with(['authors', 'images', 'user'])
                ->where('isbn', $isbn)->first();
            if ($book != null) {
                $request = $this->parseRequest($request);
                $book->update($request->all());

                //delete all old images
                $book->images()->delete();
                // save images
                if (isset($request['images']) && is_array($request['images'])) {
                    foreach ($request['images'] as $img) {
                        $image = Image::firstOrNew(['url'=>$img['url'],'title'=>$img['title']]);
                        $book->images()->save($image);
                    }
                }
                //update authors

                $ids = [];
                if (isset($request['authors']) && is_array($request['authors'])) {
                    foreach ($request['authors'] as $auth) {
                        array_push($ids,$auth['id']);
                    }
                }
                $book->authors()->sync($ids);
                $book->save();

            }
            DB::commit();
            $book1 = Book::with(['authors', 'images', 'user'])
                ->where('isbn', $isbn)->first();
            // return a vaild http response
            return response()->json($book1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating book failed: " . $e->getMessage(), 420);

        }
    }
     */

    //delete existing user with given user id (->id)
    public function delete(string $id) {
        $user = User::where('id', $id)->first();
        if($user != null) {
            $user->delete();
        } else {
            throw new \Exception("user could not be deleted - it does not exist");
            return response()->json('user ('. $id . ') successfully deleted', 200);
        }
    }
}
