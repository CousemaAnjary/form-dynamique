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

        // Retourner le projet créé avec un code de statut HTTP 201 : Ressource créée
        return response()->json([
            'project' => $project,
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
}