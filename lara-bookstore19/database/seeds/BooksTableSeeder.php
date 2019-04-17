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
        $book = new App\Book();//wird auf fassade gemappt, fassade greift auf DBank
        $book->title = "Herr der Ringe!";
        $book->isbn = '1234512345';
        $book->subtitle = "Die Rückkehr des Königs";
        $book->rating = 10;
        $book->description = "Hat ein paar Oscars gewonnen, hier darf man als Mann weinen";
        $book->net_price = 9.99;
        $book->published = new DateTime();

        //get the first user of DB
        $user = \App\User::all()->first();
        $book->user()->associate($user);//adding user
        $book->save();//save in DB

        //only inserts the missing ones
        $authors = \App\Author::all()->pluck('id');
        $book->authors()->sync($authors);

        //add images to book
        $image1 = new \App\Image;
        $image1->title = "Cover 1";
        $image1->url = "https://images-na.ssl-images-amazon.com/images/I/61ZrGM%2BJF5L._SL1100_.jpg";
        $image1->book()->associate($book);
        $image1->save();

        $image2 = new \App\Image;
        $image2->title = "Cover 2";
        $image2->url = "https://images-na.ssl-images-amazon.com/images/I/61ZrGM%2BJF5L._SL1100_.jpg";
        $image2->book()->associate($book);
        $image2->save();


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
