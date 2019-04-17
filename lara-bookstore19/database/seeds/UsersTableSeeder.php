<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //test user
        $user = new \App\User;
        $user->name = "testuser";
        $user->email = 'test@gmail.com';
        $user->password = bcrypt('secret');//brypt is default encryption
        $user->isAdmin = false;
        $user->firstName = 'Maxi';
        $user->lastName = 'Mustermann';
        $user->address = 'Fakestreet 106/Top13';
        $user->save();
    }
}
