<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Backend\OptionController;
use App\Http\Controllers\Api\Backend\ProjectController;
use App\Http\Controllers\Api\Backend\QuestionController;

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
Route::put('project/{id}/complete', [ProjectController::class, 'saveAndCompleteProject']);



// Routes pour les questions
Route::post('project/{projectId}/question', [QuestionController::class, 'store']);
Route::get('project/{projectId}/questions', [QuestionController::class, 'index']);
Route::get('question/{id}', [QuestionController::class, 'show']);
Route::put('question/{id}', [QuestionController::class, 'update']);
Route::put('question/{id}/position', [QuestionController::class, 'updatePosition']); // Nouvelle route pour mettre à jour la position
Route::delete('question/{id}', [QuestionController::class, 'destroy']);