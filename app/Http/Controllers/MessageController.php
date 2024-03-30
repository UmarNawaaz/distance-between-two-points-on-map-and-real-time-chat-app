<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $data = $request->all();

            $validator = Validator::make($request->all(), [
                'message' => 'required|string',
                'sender_id' => 'required|exists:users,id',
                'receiver_id' => 'required|exists:users,id',
            ]);

            if ($validator->passes()) {

                Message::create([
                    'message' => $request->input('message'),
                    'sender_id' => $request->input('sender_id'),
                    'receiver_id' => $request->input('receiver_id'),
                ]);

                $messages = Message::betweenUsers($data['sender_id'],  $data['receiver_id'])->get();

                \App\Events\Message::dispatch($messages, $data['receiver_id']);

                return response()->json(['result' => $messages], 200);
            } else {
                return redirect()->back()->withErrors($validator)->withInput();
            }
        } catch (Exception $e) {

            return response()->json(['result' => 'error'], 301);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $receiver_id)
    {
        try {
            $user = Auth::user();
            $messages = Message::betweenUsers($user->id, $receiver_id)->get();

            return Inertia::render('Dashboard', [
                'messages' => $messages,
                'reciever' => User::find($receiver_id)->toArray(),
                'users' => User::all()->toArray()
            ]);
        } catch (Exception $e) {
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
