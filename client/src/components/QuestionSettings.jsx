import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { updateQuestion } from '@/services/questionService';

export default function QuestionSettings({ question, onClose }) {
    const [label, setLabel] = useState(question.label);
    const [instruction, setInstruction] = useState('');
    const [isRequired, setIsRequired] = useState(question.required);

    const handleSave = async () => {
        try {
            await updateQuestion(question.id, { label, instruction, required: isRequired });
            onClose(); // Fermer les paramètres après la sauvegarde
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la question : ', error);
        }
    };

    return (
        <div className="border rounded p-6 mt ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Modifier la question</h2>
                <Button variant="outline" className="ml-2" onClick={onClose}>
                    <X size={16} />
                </Button>
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    className="w-full"
                    placeholder="Nom du Champ"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    className="w-full"
                    placeholder="Instruction supplémentaire"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Réponse obligatoire :</label>
                <select
                    className="w-full"
                    value={isRequired}
                    onChange={(e) => setIsRequired(e.target.value === 'true')}
                >
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
            </div>
            <Button className="bg-blue-900" onClick={handleSave}>Enregistrer</Button>
        </div>
    );
}
