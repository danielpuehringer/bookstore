<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use \Illuminate\Support\Facades;

/*Fassades in laraval are there to make the access to the Database easier
keep in mind, that we are using MySql, but you can use other databases with
laraven as well - the DB facade provides static methods which handle
the access for the database, no matter which database we are using.
So: Fassades make it easier to access the data of the database, independently
about the type of the database.*/

/*
 * Active Record vs OR-Mapping
 * OR-Mapping: everything in the DB is reflected as an object in the
 * OOP-Style --> easy to learn for ooP-Programmers
 * Active Record: one way to implement the OR-Mapping approach
 * Advantage: easy to learn
 * Disadvantage: sometimes very slow and inefficient
 *
 * Since we are using laravel, we use the natively implemented Active Record
 * implementation for accessing stuff on the DB
 *
 * Hibernate: is faster than active record, but more complex and only for JAVA
 * */

Route::get('/', 'BookController@index');
Route::get('/books', 'BookController@index');

//id does not have to be added as parameter in show because it uses the param from
// the {id} route
Route::get('/books/{id}', 'BookController@show');

Route::get('/users', 'UserController@index');
