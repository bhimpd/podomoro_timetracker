<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(TaskRequest $request){

        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'estimated_cycles' => $request->estimated_cycles ?? 1,  // Use default if not provided
            'completed_cycle' => $request->completed_cycle ?? 0,    // Use default if not provided
            'status' => $request->status ?? 'pending',              // Use default if not provided
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

}
