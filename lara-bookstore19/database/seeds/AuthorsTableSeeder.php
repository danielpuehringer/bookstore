<?php

use Illuminate\Database\Seeder;

class AuthorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $author1 = new \App\Author;
        $author1->firstName = "J.R.R.";
        $author1->lastName = "Tolkien";
        $author1->save();

        $author2 = new \App\Author;
        $author2->firstName = "George R.R.";
        $author2->lastName = "Martin";
        $author2->save();

        $author3 = new \App\Author;
        $author3->firstName = "Scott";
        $author3->lastName = "Fitzgerald";
        $author3->save();
    }
}
