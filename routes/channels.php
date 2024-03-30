<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('task-wise360.{receiverId}', function ($user,$receiverId) {
    return !is_null($user) && User::where('id', $receiverId)->exists();
});
