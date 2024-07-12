<?php

namespace App\Http\Controllers\Api\Backend;

use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Backend\QuestionRequest;

class QuestionController extends Controller
{
    public function store(QuestionRequest $request, int $projectId)
    {
        // Validation des données de la requête
        $validated = $request->validated();

        // Création de la question
        $validated['project_id'] = $projectId;
        $question = Question::create($validated);

        return response()->json([
            'question' => $question,
            'message' => 'Question créée avec succès.'
        ], 201);
    }
}