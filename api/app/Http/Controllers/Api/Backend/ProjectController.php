<?php

namespace App\Http\Controllers\Api\Backend;

use App\Models\Project;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use App\Http\Requests\Api\Backend\ProjectRequest;

class ProjectController extends Controller
{
    public function store(ProjectRequest $request)
    {
        // Valider les données de la requête
        $validated = $request->validated();

        // Créer un nouveau projet
        $project = Project::create($validated);

        // Retourner le projet créé avec un code de statut HTTP 201 : Ressource créée
        return response()->json([
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'table_name' => $project->table_name,
                'status' => $project->status,
            ],
            'message' => 'Projet créé avec succès.'
        ], 201);
    }

    public function index()
    {
        // Récupérer tous les projets
        $projects = Project::all();

        // Retourner les projets avec un code de statut HTTP 200: OK
        return response()->json([
            'projects' => $projects
        ], 200);
    }

    public function show($id)
    {
        // Récupérer le projet avec l'identifiant $id
        $project = Project::findOrFail($id);

        // Retourner le projet avec un code de statut HTTP 200: OK
        return response()->json([
            'project' => $project
        ], 200);
    }

    public function saveAndCompleteProject($id)
    {
        $project = Project::findOrFail($id);
        $questions = Question::where('project_id', $id)->get();

        // Créer la table dynamique
        Schema::create($project->table_name, function (Blueprint $table) use ($questions) {
            $table->id();
            foreach ($questions as $question) {
                $type = $this->mapQuestionTypeToColumnType($question->type);
                $table->$type($question->label)->nullable();
            }
            $table->timestamps();
        });

        // Mettre à jour le statut du projet
        $project->status = 'terminée';
        $project->save();

        return response()->json([
            'message' => 'Projet terminé et table créée avec succès.',
        ]);
    }

    private function mapQuestionTypeToColumnType($type)
    {
        $map = [
            'text' => 'string',
            'email' => 'string',
            'password' => 'string',
            'radio' => 'string',
            'checkbox' => 'boolean',
            'select' => 'string',
            'file' => 'string',
            'date' => 'date',
            'number' => 'integer',
        ];

        return $map[$type] ?? 'string';
    }
}