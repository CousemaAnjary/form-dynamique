<?php

namespace App\Http\Controllers\Api\Backend;

use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OptionController extends Controller
{
    public function store(Request $request, $questionId)
    {
        $question = Question::findOrFail($questionId);

        $option = $question->options()->create([
            'label' => $request->label,
            'value' => $request->value,
        ]);

        return response()->json($option, 201);
    }

    public function index($questionId)
    {
        $question = Question::findOrFail($questionId);
        return response()->json($question->options);
    }

    public function update(Request $request, $id)
    {
        $option = Option::findOrFail($id);
        $option->update($request->only(['label', 'value']));

        return response()->json($option);
    }

    public function destroy($id)
    {
        $option = Option::findOrFail($id);
        $option->delete();

        return response()->json(null, 204);
    }
}