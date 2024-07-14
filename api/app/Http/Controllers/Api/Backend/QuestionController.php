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

        return response()->json([
            'question' => $question->load('options'),
            'message' => 'Question créée avec succès.'
        ], 201);
    }

    public function index($projectId)
    {
        $questions = Question::where('project_id', $projectId)->with('options')->get();

        return response()->json([
            'questions' => $questions
        ]);
    }

    public function show($id)
    {
        $question = Question::with('options')->findOrFail($id);

        return response()->json([
            'question' => $question
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'placeholder' => 'nullable|string|max:255',
            'required' => 'boolean',
            'options' => 'array',
            'options.*.value' => 'required|string|max:255',
            'options.*.label' => 'nullable|string|max:255', // Ajoutez cette ligne si le label est nécessaire
        ]);

        $question = Question::findOrFail($id);
        $question->update($validated);

        // Mise à jour des options associées
        $question->options()->delete();
        if (isset($validated['options'])) {
            foreach ($validated['options'] as $optionData) {
                $question->options()->create($optionData);
            }
        }

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