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
        //test user1
        $user1 = new \App\User;
        $user1->name = "testuser";
        $user1->email = 'test@gmail.com';
        $user1->password = bcrypt('secret');//brypt is default encryption
        $user1->isAdmin = false;
        $user1->firstName = 'Maxi';
        $user1->lastName = 'Mustermann';
        $user1->address = 'Fakestreet 106/Top13';
        $user1->save();

        //test user2
        $user2 = new \App\User;
        $user2->name = "admin";
        $user2->email = 'admin@gmail.com';
        $user2->password = bcrypt('admin');//brypt is default encryption
        $user2->isAdmin = true;
        $user2->firstName = 'John';
        $user2->lastName = 'Admin';
        $user2->address = 'Hackerway 106/Top13';
        $user2->save();
    }
}
