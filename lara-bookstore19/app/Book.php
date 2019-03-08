<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{

    //protected $table = 'name_der_tabelle';

    //protected $guarded

    protected $fillable = ['isbn', 'title', 'subtitle',
    'published', 'rating', 'description', 'user_id'];//those can be edited via HTTP?!

    //QueryScopes --> präfix scope ($squery ist bereits der erste
    // teil eines queries, um ein verknüpftes query zu erhalten)
    //cmd with tinker: App\Book::favourite()->get() to test this method
    public function scopeFavourite($query){
        return $query->where('rating', '>=', 8);
    }

    public function images() : HasMany{ //1:N--> HasMany; 1:1 --> HasOne
        return $this->hasMany(Image::class);
    }

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    /*public function all(){
        $result = DB::table('books')->get();
        return $result;
    }*/
}
