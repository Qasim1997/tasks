<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Carbon\Carbon;
use App\Models\UserPasswordRest;
use Illuminate\Support\Str;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Facade\Ignition\DumpRecorder\Dump;

class UserResetPassword extends Controller

    {
        public function send_reset_password_email(Request $request){
            $request->validate([
                'email' => 'required|email',
            ]);
            $email = $request->email;

            // Check User's Email Exists or Not
            $user = User::where('email', $email)->first();
            if(!$user){
                return response([
                    'message'=>'Email doesnt exists',
                    'status'=>'failed'
                ], 404);
            }

            // Generate Token
            $token = Str::random(60);

            // Saving Data to Password Reset Table
            UserPasswordRest::create([
                'email'=>$email,
                'token'=>$token,
                'created_at'=>Carbon::now()
            ]);

            // Sending EMail with Password Reset View
           $checkemail =  Mail::send('reset', ['token'=>$token], function(Message $message)use($email){
                $message->subject('Reset Your Password');
                $message->to($email);
            });
            return response([
                'message'=>'Password Reset Email Sent... Check Your Email',
                'status'=>'success',
                'email'=>$checkemail
            ], 200);
        }

        public function reset(Request $request, $token){
            // Delete Token older than 2 minute
            $formatted = Carbon::now()->subMinutes(2)->toDateTimeString();
            UserPasswordRest::where('created_at', '<=', $formatted)->delete();

            $request->validate([
                'password' => 'required|confirmed',
            ]);
            dd($request);

            $passwordreset = UserPasswordRest::where('token', $token)->first();

            if(!$passwordreset){
                return response([
                    'message'=>'Token is Invalid or Expired',
                    'status'=>'failed'
                ], 404);
            }

            $user = User::where('email', $passwordreset->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            // Delete the token after resetting password
            UserPasswordRest::where('email', $user->email)->delete();

            return response([
                'message'=>'Password Reset Success',
                'status'=>'success'
            ], 200);
        }
    }
