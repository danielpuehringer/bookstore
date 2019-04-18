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

    public function findByUserId($id){
        $user = User::where('id', $id)->with(['orders', 'books'])->first();
        return $user != null ?
            response()->json($user , 200)//INFO: if this causes trouble, change back to "return $user;"
            : response()->json('user with id '.$id. ' does not exist', 404);
    }


}
