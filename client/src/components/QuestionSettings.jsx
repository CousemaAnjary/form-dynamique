import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { updateQuestion } from '@/services/questionService';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

export default function QuestionSettings({ question, onClose }) {
    /**
   * ! STATE (état, données) de l'application
   */
    const form = useForm({
        defaultValues: {
            label: question.label,
            type: question.type,
            placeholder: '',
            required: question.required,
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    const [label, setLabel] = useState(question.label);
    const [type, setType] = useState(question.type);
    const [placeholder, setPlaceholder] = useState(question.placeholder);
    const [isRequired, setIsRequired] = useState(question.required);

    const handleSave = async () => {
        try {
            await updateQuestion(question.id, { label, type, placeholder, required: isRequired });
            onClose(); // Fermer les paramètres après la sauvegarde
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la question : ', error);
        }
    };

    return (
        <div className="border rounded p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Modifier la question</h2>
                <Button variant="outline" size="sm" className="ml-2" onClick={onClose}>
                    <X size={16} />
                </Button>
            </div>
            <Form>
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
                    <label className="block text-gray-700">Type :</label>
                    <select
                        className="w-full"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="select">Select</option>
                        <option value="file">File</option>
                        <option value="date">Date</option>
                        <option value="number">Number</option>
                    </select>
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        className="w-full"
                        placeholder="Placeholder"
                        value={placeholder}
                        onChange={(e) => setPlaceholder(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Réponse obligatoire :</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="isRequired"
                                value="true"
                                checked={isRequired === true}
                                onChange={() => setIsRequired(true)}
                            />
                            <span>Oui</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="isRequired"
                                value="false"
                                checked={isRequired === false}
                                onChange={() => setIsRequired(false)}
                            />
                            <span>Non</span>
                        </label>
                    </div>
                </div>
                <Button type='submit' className="bg-blue-900">Enregistrer</Button>
            </Form>
        </div>
    );
}
