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

    public function end($id)
    {
        // Find the session
        $session = PomodoroSession::find($id);

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found.',
            ], 404);
        }

         // Check if session is already completed
        if ($session->status === 'completed') {
            return response()->json(['message' => 'Session already completed'], 400);
        }

        // End the session
        $session->status = 'completed';
        $session->end_time = Carbon::now(); // Mark the end time
        $session->save();

        // Retrieve the task related to the session
        $task = $session->task;

        if (!$task) {
            return response()->json(['message' => 'Task not found for this session'], 404);
        }

        // Update the task completed_cycles
        $task->completed_cycle += 1;
        $task->save();

        return response()->json([
            'message' => 'Pomodoro session completed',
            'session_id' => $session->id,
            'task_id' => $task->id,
            'completed_cycles' => $task->completed_cycle
        ]);
    }

    public function skip($id)
    {
       // Find the session
       $session = PomodoroSession::find($id);

       if (!$session) {
           return response()->json([
               'success' => false,
               'message' => 'Session not found.',
           ], 404);
       }

        // Check if session is already completed or skipped
        if (in_array($session->status, ['completed', 'skipped'])) {
            return response()->json(['message' => 'Session already completed or skipped'], 400);
        }
    
        // Skip the session
        $session->status = 'skipped';
        $session->end_time = Carbon::now(); // Mark the skip time
        $session->save();
    
        return response()->json([
            'message' => 'Pomodoro session skipped',
            'session_id' => $session->id
        ]);
    }


    public function show($id)
    {
        // Find the session
       $session = PomodoroSession::find($id);

       if (!$session) {
           return response()->json([
               'success' => false,
               'message' => 'Session not found.',
           ], 404);
       }

        return response()->json([
            'session' => $session
        ]);
    }

    public function active()
    {
        // Fetch active sessions for the authenticated user
        $sessions = PomodoroSession::where('user_id', auth()->user()->id)
            ->whereIn('status', ['running', 'paused'])
            ->get();

        return response()->json([
            'sessions' => $sessions
        ]);
    }

    public function taskSessions($task_id)
    {
        // Fetch all sessions for a specific task
        $sessions = PomodoroSession::where('task_id', $task_id)->get();

        if (!$sessions) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found that task id.',
            ], 404);
        }

        return response()->json([
            'sessions' => $sessions
        ]);
    }

}
