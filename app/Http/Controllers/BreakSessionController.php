<?php

namespace App\Http\Controllers;

use App\Models\BreakSession;
use App\Models\PomodoroSession;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BreakSessionController extends Controller
{
    public function start($pomodoro_session_id)
    {
        $pomodoroSession = PomodoroSession::find($pomodoro_session_id);

        if(!$pomodoroSession){
            return response()->json([
                'message' => 'Pomodor Session not found..'
            ],404);
        }

        // Determine if it’s a short or long break
        $breakType = ($pomodoroSession->task->completed_cycle % 4 == 0) ? 'long' : 'short';

        $breakSession = BreakSession::create([
            'user_id' => auth()->id(),
            'pomodoro_session_id' => $pomodoroSession->id,
            'type' => $breakType,
            'start_time' => Carbon::now(),
        ]);

        return response()->json(['message' => 'Break started', 'break' => $breakSession]);
    }
}
