import React from 'react';
import { Button } from "@/components/ui/button";

export default function NewForm() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center ">
                <div className="flex items-center space-x-2">
                    <div className="text-xl font-semibold">projet</div>
                    <input
                        type="text"
                        className="border rounded px-4 py-2"
                        placeholder="Titre"
                        defaultValue="TEST"
                    />
                </div>
                <Button className="bg-blue-500 text-white">SAUVEGARDER</Button>
            </div>
            
            <div className="border rounded p-4 text-center">
                <p className="text-gray-500">
                    Ce formulaire est actuellement vide.
                    Vous pouvez ajouter des questions, notes, messages-guide ou autres champs en cliquant sur le signe « + » plus bas.
                </p>
            </div>
        </div>
    );
}
