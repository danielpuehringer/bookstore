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



        //THIRD BOOK
        $book3 = new App\Book();//wird auf fassade gemappt, fassade greift auf DBank
        $book3->title = "Next.js Quick Start Guide";
        $book3->isbn = '1244542345';
        $book3->subtitle = "Server-side rendering done right (English Edition)";
        $book3->rating = 7;
        $book3->description = "Rendering things";
        $book3->net_price = 39.99;
        $book3->published = new DateTime();

        //get the last user of DB
        $user = \App\User::all()->last();
        $book3->user()->associate($user);//adding user
        $book3->save();//save in DB

        //only inserts the missing ones
        $authors = \App\Author::first()->pluck('id');
        $book3->authors()->sync($authors);

        //add images to book
        $image6 = new \App\Image;
        $image6->title = "Cover 1";
        $image6->url = "https://images-eu.ssl-images-amazon.com/images/I/51hhlirIhVL.jpg";
        $image6->book()->associate($book3);
        $image6->save();

        $image7 = new \App\Image;
        $image7->title = "Cover 2";
        $image7->url = "https://images-na.ssl-images-amazon.com/images/I/61+Qe7321NL._SY200_.jpg";
        $image7->book()->associate($book3);
        $image7->save();


        //FOURTH BOOK
        $book4 = new App\Book();//wird auf fassade gemappt, fassade greift auf DBank
        $book4->title = "Kinderbuch";
        $book4->isbn = '1244587785';
        $book4->subtitle = "Heute gibt es warme eiscreme";
        $book4->rating = 4;
        $book4->description = "Eis = lecker";
        $book4->net_price = 9.99;
        $book4->published = new DateTime();

        //get the last user of DB
        $user = \App\User::all()->last();
        $book4->user()->associate($user);//adding user
        $book4->save();//save in DB

        //only inserts the missing ones
        $authors = \App\Author::first()->pluck('id');
        $book4->authors()->sync($authors);

        //add images to book
        $image8 = new \App\Image;
        $image8->title = "Cover 1";
        $image8->url = "https://images-eu.ssl-images-amazon.com/images/I/51Nxr9JfAPL.jpg";
        $image8->book()->associate($book4);
        $image8->save();

        $image9 = new \App\Image;
        $image9->title = "Cover 2";
        $image9->url = "https://cdn1.spiegel.de/images/image-1423777-860_poster_16x9-cisx-1423777.jpg";
        $image9->book()->associate($book4);
        $image9->save();




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
