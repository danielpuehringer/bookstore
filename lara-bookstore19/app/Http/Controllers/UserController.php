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
}
