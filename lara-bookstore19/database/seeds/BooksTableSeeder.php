<?php

use Illuminate\Database\Seeder;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*\Illuminate\Support\Facades\DB::table('books')->insert([
            'title' => 'Herr der Ringel',
            'isbn' => '1234512345',
            'subtitle' => 'Die Rückkehr des Königs',
            'rating' => 10,
            'description' => 'Hat ein paar Oscars gewonnen',
            'published' => new DateTime()
        ]);*/
        $book1 = new App\Book();//wird auf fassade gemappt, fassade greift auf DBank
        $book1->title = "Lord of the rings";
        $book1->isbn = '1234512345';
        $book1->subtitle = "The fellowship of the ring";
        $book1->rating = 10;
        $book1->description = "First Part of the lord of the rings, starting the journey";
        $book1->net_price = 29.99;
        $book1->published = new DateTime();

        //get the first user of DB
        $user = \App\User::all()->first();
        $book1->user()->associate($user);//adding user
        $book1->save();//save in DB

        //only inserts the missing ones
        $authors = \App\Author::all()->pluck('id');
        $book1->authors()->sync($authors);

        //add images to book
        $image1 = new \App\Image;
        $image1->title = "Cover 1";
        $image1->url = "https://images-na.ssl-images-amazon.com/images/I/41-0ixQIDQL._SX310_BO1,204,203,200_.jpg";
        $image1->book()->associate($book1);
        $image1->save();

        $image2 = new \App\Image;
        $image2->title = "Cover 2";
        $image2->url = "https://images-na.ssl-images-amazon.com/images/I/71jAHCApjVL.jpg";
        $image2->book()->associate($book1);
        $image2->save();

        //Second Book
        $book2 = new App\Book();//wird auf fassade gemappt, fassade greift auf DBank
        $book2->title = "Game of thrones";
        $book2->isbn = '123451234567';
        $book2->subtitle = "A song of ice and fire";
        $book2->rating = 10;
        $book2->description = "First part of the game of thrones saga";
        $book2->net_price = 19.99;
        $book2->published = new DateTime();
        //get the first user of DB
        $user = \App\User::all()->first();
        $book2->user()->associate($user);//adding user
        $book2->save();//save in DB
        //only inserts the missing ones
        $authors = \App\Author::all()->pluck('id');
        $book2->authors()->sync($authors);
        //add images to book
        $image3 = new \App\Image;
        $image3->title = "Cover 1 Front";
        $image3->url = "https://www.emp.at/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw17261504/images/2/9/7/1/297143-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png";
        $image3->book()->associate($book2);
        $image3->save();

        $image4 = new \App\Image;
        $image4->title = "Cover 1 back";
        $image4->url = "https://www.emp.at/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw04934451/images/2/9/7/1/297143s2-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png";
        $image4->book()->associate($book2);
        $image4->save();

        $image5 = new \App\Image;
        $image5->title = "Cover 1 back";
        $image5->url = "https://www.emp.at/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw55ebc8d2/images/2/9/7/1/297143s-emp.jpg?sw=350&sh=400&sm=fit&sfrm=png";
        $image5->book()->associate($book2);
        $image5->save();




        /*//update
        $book = App\Book::find(1);
        $book->title = "Neuer Title";
        $book->save();*/
        //delete: $book->delete();

        //findOrCreate updateOrCreate
        //$book = App\Book::findOrCreate(['title' => 'Buchtitel']);


        //Element in Beziehung einfügen
        /*$book->user()->associate($user1);
        $book->save();*/

        //$book->authors()->sync([1,2,3]);//for updating stuff in M:N Relationship
    }


}
