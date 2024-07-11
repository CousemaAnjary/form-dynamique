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


// Définir le schéma de validation avec Zod 
const formSchema = z.object({
    title: z.string().min(1, { message: "Le titre est requis" }),
    description: z.string().optional(),
    table_name: z.string().min(1, { message: "Le nom de la table est requis" }),
    status: z.enum(['brouillon', 'terminé']),
})

export default function ProjectDialog({ sidebarOpen }) {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            table_name: '',
            status: 'brouillon',
        },

    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     navigate('/new-form');
    // }

    const handleSubmit = async (data) => {
        //Données à envoyer pour la création du projet
        const projectData = {
            title: data.title,
            description: data.description,
            table_name: data.table_name,
            status: data.status,
        }

        try {
            const response = await createProject(projectData)
            // Rediriger l'utilisateur vers la page de création de formulaire
            navigate('/new-form');

        } catch (error) {
            console.error('Erreur lors de la création du projet', error)
        }
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
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Titre du projet (requis)</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="ex: Formulaire de contact, Formulaire d'inscription, etc." className="shadow-sm" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Veuillez saisir une courte description ici" className="shadow-sm" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid  gap-4">
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="table_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom de la table (requis)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="ex: users, posts, comments, etc." className="shadow-sm" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-blue-900 w-full">Créer le formulaire</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
