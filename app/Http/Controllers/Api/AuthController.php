<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);


        if(!$user){
            return response()->json([
                'message' => 'User registered failed'
            ], 500);
        }
        else{
            $token = $user->createToken('authToken')->plainTextToken;
    
            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
                'token' => $token
            ], 201);
        }
        
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password'
            ], 401);
        }
    
        $token = $user->createToken('authToken')->plainTextToken;
    
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ], 200);
    }
}