<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index(){
        //load all authors and relations with eager loading

        $authors = Author::get();
        return $authors;
    }
}
