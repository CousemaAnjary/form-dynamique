<?php

namespace App\Http\Controllers\Api\Backend;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Backend\ProjectRequest;

class ProjectController extends Controller
{
    public function store(ProjectRequest $request)
    {
        // Valider les données de la requête
        $validated = $request->validated();

        // Créer un nouveau projet
        $project = Project::create($validated);

        // Retourner le projet créé avec un code de statut HTTP 201
        return response()->json([
            'project' => $project,
            'message' => 'Projet créé avec succès.'
        ], 201);
    }
}