import { z } from "zod"
import React from 'react'
import { useState } from "react"
import { Plus } from 'lucide-react'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProject } from "@/services/projectService"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"


export default function ProjectDialog({ sidebarOpen }) {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate();

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/new-form');
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center space-x-2 w-full justify-center p-3 py-7 mb-2 text-base bg-blue-900 text-white">
                    {sidebarOpen ? "Nouveau" : <Plus size={26} className="text-white" />}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Créer le projet: Détails du formulaire</DialogTitle>
                </DialogHeader>
                <Form>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-4">
                                <Label htmlFor="project-title">Titre du projet (requis)</Label>
                                <Input
                                    id="project-title"
                                    placeholder="ex: Formulaire de contact, Formulaire d'inscription, etc."
                                />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="project-description">Description</Label>
                                <Input
                                    id="project-description"
                                    placeholder="Veuillez saisir une courte description ici"
                                />
                            </div>
                            <div className="grid  gap-4">
                                <div className="grid gap-4">
                                    <Label htmlFor="project-country">Nom de la table (requis)</Label>
                                    <Input
                                        id="table-name"
                                        placeholder="ex: users, posts, comments, etc."
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Retour</Button>
                            <Button type="submit" className="bg-blue-900">Créer le formulaire</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
