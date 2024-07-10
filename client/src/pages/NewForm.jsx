import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';

export default function NewForm() {
    return (
        <>
            <div className="shadow">
                <div className="container-fluid mx-20 flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-semibold">projet</h1>
                        <Input type="text" className="border rounded px-4 py-2" placeholder="Titre" defaultValue="Formulaire de contact" disabled />
                    </div>
                    <Button className="bg-blue-500 rounded-sm text-white">Sauvegarder</Button>
                </div>
            </div>
            <div className="container mx-auto mt-10">
                <div className="border rounded p-4 text-center relative">
                    <p className="text-gray-500">
                        Ce formulaire est actuellement vide.
                        Vous pouvez ajouter des questions, notes, messages-guide ou autres champs en cliquant sur le signe « + » plus bas.
                    </p>
                    <Button className="absolute left-0 top-7 transform translate-x-[-50%] translate-y-[-50%]  rounded-full p-2 flex items-center justify-center bg-blue-500"  >
                        <Plus size={24} />
                    </Button>
                </div>
            </div>
        </>
    );
}
