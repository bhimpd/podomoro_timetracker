<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    public function store(TaskRequest $request)
    {

        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'estimated_cycles' => $request->estimated_cycles ?? 1,
            'completed_cycle' => $request->completed_cycle ?? 0,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();

        if ($tasks->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'No tasks found for the user.',
                'tasks' => []
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Tasks fetched successfully',
            'tasks' => $tasks
        ], 200);
    }
}