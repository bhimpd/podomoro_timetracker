<?php

namespace App\Http\Controllers;

use App\Models\BreakSession;
use App\Models\PomodoroSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class StatsController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $totalPomodoros = PomodoroSession::where('user_id', $user->id)->where('status', 'completed')->count();
        $totalBreaks = BreakSession::where('user_id', $user->id)->count();
        $totalTimeSpent = PomodoroSession::where('user_id', $user->id)
            ->whereNotNull('start_time')
            ->whereNotNull('end_time')
            ->sum(DB::raw('TIMESTAMPDIFF(MINUTE, start_time, end_time)'));

        return response()->json([
            'total_pomodoros' => $totalPomodoros,
            'total_breaks' => $totalBreaks,
            'total_time_spent' => $totalTimeSpent,
        ]);
    }
}
