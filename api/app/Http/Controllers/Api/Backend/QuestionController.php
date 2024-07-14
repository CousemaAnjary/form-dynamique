<?php

namespace App\Http\Controllers\Api\Backend;

use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Backend\QuestionRequest;

class QuestionController extends Controller
{
    public function store(QuestionRequest $request)
    {
        // Validation des données de la requête
        $validated = $request->validated();

        // Création de la question
        $question = Question::create($validated);

        // Création des options associées
        if (isset($validated['options'])) {
            foreach ($validated['options'] as $optionData) {
                $question->options()->create($optionData);
            }
        }

        // Retour de la réponse JSON 
        return response()->json([
            'question' => $question->load('options'),
            'message' => 'Question créée avec succès.'
        ], 201);
    }

    public function index($projectId)
    {
        // Récupération des questions associées à un projet
        $questions = Question::where('project_id', $projectId)->with('options')->get();

        // Retour de la réponse JSON
        return response()->json([
            'questions' => $questions
        ]);
    }

    public function update(QuestionRequest $request, $id)
    {
        // Validation des données de la requête
        $validated = $request->validated();

        // Récupération de la question par son ID
        $question = Question::findOrFail($id);

        // Mise à jour de la question
        $question->update($validated);

        // Mise à jour des options associées
        $question->options()->delete();
        if (isset($validated['options'])) {
            foreach ($validated['options'] as $optionData) {
                $question->options()->create($optionData);
            }
        }

        // Retour de la réponse JSON
        return response()->json([
            'question' => $question->load('options'),
            'message' => 'Question mise à jour avec succès.'
        ]);
    }

    public function updatePosition(Request $request, $id)
    {
        $validated = $request->validate([
            'position' => 'required|integer',
        ]);

        $question = Question::findOrFail($id);
        $question->update(['position' => $validated['position']]);

        return response()->json([
            'question' => $question,
            'message' => 'Position mise à jour avec succès.'
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