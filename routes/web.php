<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard/{reciever_id?}', function (?int $reciever_id=null) {

    try{
         $user=Auth::user();

        if($reciever_id)
        {
            $messages=DB::table('messages')
            ->whereIn('sender_id',[$reciever_id,$user->id])
            ->whereIn('receiver_id',[$reciever_id,$user->id])
            ->get();

            $reciever=DB::table('users')->where('id',$reciever_id)->get();

            return Inertia::render('Dashboard',[
                'messages'=>$messages,
                'reciever'=>$reciever,
                'users'=>DB::table('users')->get()
            ]);
        }
        else
        {
            return Inertia::render('Dashboard',[
                'users'=>DB::table('users')->get()
            ]);
        }
    }catch(Exception $e){

    }

})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/map', function () {
    return Inertia::render('Map');
})->name('map');


require __DIR__.'/auth.php';
