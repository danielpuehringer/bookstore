<?php

namespace App\Http\Controllers;

use App\User;
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
    public function update(Request $request, string $isbn) : JsonResponse {
        DB::beginTransaction();//TODO 
        /*try {
            $user = User::with()
        }*/
    }

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
