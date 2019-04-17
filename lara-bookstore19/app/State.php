<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class State extends Model
{
    protected $fillable = [
        'comment', 'state'
    ];

    public function order(): BelongsTo{
        return $this->belongsTo(Order::class);
    }
}
