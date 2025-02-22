<?php

namespace App\Http\Controllers;

use App\Models\PomodoroSession;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PomodoroSessionController extends Controller
{
    public function start($task_id)
    {
        // Validate if task exists
        $task = Task::find($task_id);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found.',
            ], 404);
        }

        // Create a new Pomodoro session
        $session = new PomodoroSession();
        $session->task_id = $task_id;
        $session->status = 'running';
        $session->start_time = Carbon::now();
        $session->user_id = auth()->user()->id; 
        $session->save();

        return response()->json([
            'success' => true,
            'message' => 'Pomodoro session started',
            'session_id' => $session->id,
            'task_id' => $task->id
        ],200);
    }

    public function pause($id)
    {
        // Find the session
        $session = PomodoroSession::find($id);

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found.',
            ], 404);
        }
        if ($session->status !== 'running') {
            return response()->json(['message' => 'Session is not running'], 400);
        }

        $session->status = 'paused';
        $session->end_time = Carbon::now();
        $session->save();

        return response()->json([
            'message' => 'Pomodoro session paused',
            'session_id' => $session->id
        ]);
    }

}
