<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Events\MyEvent;
use App\Events\Message;
use Illuminate\Support\Facades\DB;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/store',function(Request $request){
    
    try{
        $data=$request->all();
        DB::table('messages')->insert([
            'message' => $data['message'], 
            'sender_id' => $data['sender_id'],
            'receiver_id' => $data['receiver_id']
        ]);
    
        $messages=DB::table('messages')
            ->whereIn('sender_id',[$data['sender_id'],$data['receiver_id']])
            ->whereIn('receiver_id',[$data['sender_id'],$data['receiver_id']])
            ->get();
    
        \App\Events\Message::dispatch($messages,$data['sender_id'],$data['receiver_id']);
    }catch(Exception $e)
    {

    }
   
    
});
