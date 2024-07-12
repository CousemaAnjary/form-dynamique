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

    public function index($projectId)
    {
        $questions = Question::where('project_id', $projectId)->get();

        return response()->json([
            'questions' => $questions
        ]);
    }

    public function show($id)
    {
        $question = Question::findOrFail($id);

        return response()->json([
            'question' => $question
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'required' => 'boolean',
            'position' => 'integer',
        ]);

        $question = Question::findOrFail($id);
        $question->update($validated);

        return response()->json([
            'question' => $question,
            'message' => 'Question mise à jour avec succès.'
        ]);
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return response()->json([
            'message' => 'Question supprimée avec succès.'
        ]);
    }
}