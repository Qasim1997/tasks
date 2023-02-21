<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\User;
use App\Mail\SendEmail;
use App\Models\Email;
use Mail;
class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $tries = 10;
    public $data;

    /**
     * Create a new job instance.
     */
    // public function __construct($data)
    // {
    //     $this->data = $data;
    // }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // $users = User::all();
        // $data = $this->data;
        // foreach ($users as $key => $user) {
        //     Mail::to($user->email)->send(new SendEmail($data, $user));
        // }
        // $data = $this->data;
        // Mail::to($data['email'])->send(new SendEmail($data));
    }
}
