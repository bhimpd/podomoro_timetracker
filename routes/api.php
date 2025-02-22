<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PomodoroSessionController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get( '/unauthenticated', [AuthController::class, 'unauthenticated'])->name('login');


Route::middleware(['auth:sanctum'])->group(function (){

    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('tasks',[TaskController::class,'store']);
    Route::get('tasks',[TaskController::class,'index']);
    Route::get('task/{id}', [TaskController::class, 'show']); 
    Route::delete('task/{id}', [TaskController::class, 'destroy']);
    Route::put('task/{id}', [TaskController::class, 'update']); 


    Route::post('/pomodoro-session/start/{task_id}', [PomodoroSessionController::class, 'start']);
    Route::post('/pomodoro-session/pause/{id}', [PomodoroSessionController::class, 'pause']);
    Route::post('/pomodoro-session/end/{id}', [PomodoroSessionController::class, 'end']);
    Route::post('/pomodoro-session/skip/{id}', [PomodoroSessionController::class, 'skip']);




});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
