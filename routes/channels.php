<?php

use Illuminate\Support\Facades\Broadcast;


Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('task-wise360.{sender}.{reciever}', function ($user, $sender, $reciever) {
    return !is_null($user);
});
