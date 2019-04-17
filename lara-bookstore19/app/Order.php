<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'order_date',
        'total_price'
    ];

    public function user(): belongsTo {
        return $this->belongsTo(User::class)->withTimestamps();
    }

    public function states() : HasMany{
        return $this->hasMany(State::class);
    }
}
