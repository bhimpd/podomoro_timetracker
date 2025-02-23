<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreakSession extends Model
{
    use HasFactory;

    protected $fillable = [
     'user_id',
     'pomodoro_session_id',
     'start_time',
     'end_time',
     'type'
    ];
}
