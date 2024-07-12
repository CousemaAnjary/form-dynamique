<?php

use App\Http\Controllers\Api\Backend\ProjectController;
use App\Http\Controllers\Api\Backend\QuestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('project', [ProjectController::class, 'store']);
Route::get('projects', [ProjectController::class, 'index']);
Route::get('project/{id}', [ProjectController::class, 'show']);



// Routes pour les questions
Route::post('project/{projectId}/question', [QuestionController::class, 'store']);
Route::get('project/{projectId}/questions', [QuestionController::class, 'index']);
Route::get('question/{id}', [QuestionController::class, 'show']);
Route::put('question/{id}', [QuestionController::class, 'update']);
Route::delete('question/{id}', [QuestionController::class, 'destroy']);