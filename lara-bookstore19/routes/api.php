<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//the "api" will be prepended --> api/books
Route::get('books', 'BookController@index');
Route::get('book/{isbn}', 'BookController@findByISBN');
Route::get('book/checkisbn/{isbn}', 'BookController@checkISBN');
Route::get('book/search/{searchTerm}', 'BookController@findBySearchTerm');

Route::get('users', 'UserController@index');
Route::get('user/{id}', 'UserController@findByUserId');
Route::post('user', 'UserController@save');
Route::delete('user/{id}', 'UserController@delete');
//Route::post(users....@store)
//Route::put('user/{id}...@update)
//Route::delete('user/{id}...@destroy)

Route::group(['middleware' => ['api', 'cors', 'jwt.auth']], function () {
Route::post('book', 'BookController@save');
Route::put('book/{isbn}', 'BookController@update');
Route::delete('book/{isbn}', 'BookController@delete');
Route::post('auth/logout', 'Auth\ApiAuthController@logout');
});



Route::group(['middleware' => ['api', 'cors']], function () {
    Route::post('auth/login', 'Auth\ApiAuthController@login');
});


