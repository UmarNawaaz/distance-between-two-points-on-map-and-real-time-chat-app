<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'sender_id',
        'receiver_id',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function scopeBetweenUsers($query, $sender_id, $reciever_id)
    {
        return $query->where(function ($query) use ($sender_id, $reciever_id) {
            $query->where('sender_id', $sender_id)
                ->where('receiver_id', $reciever_id);
        })->orWhere(function ($query) use ($sender_id, $reciever_id) {
            $query->where('sender_id', $reciever_id)
                ->where('receiver_id', $sender_id);
        });
    }
}
