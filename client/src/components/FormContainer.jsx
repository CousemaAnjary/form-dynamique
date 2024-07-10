import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from 'lucide-react';
import TypeOptions from './TypeOptions';
import FormField from './FormField';

export default function FormContainer() {
    const [showQuestionInput, setShowQuestionInput] = useState(false);
    const [showTypeOptions, setShowTypeOptions] = useState(false);
    const [fields, setFields] = useState([]);

    const handleAddQuestionClick = () => {
        setShowQuestionInput(true);
        setShowTypeOptions(false);
    };

    const handleAddTypeClick = () => {
        setShowTypeOptions(true);
    };

    const handleCloseClick = () => {
        setShowQuestionInput(false);
        setShowTypeOptions(false);
    };

    const addField = (type) => {
        setFields([...fields, { type, label: 'Nom', placeholder: 'indice de question' }]);
        setShowQuestionInput(false);
        setShowTypeOptions(false);
    };

    return (
        <>
            <div className="shadow">
                <div className="container-fluid mx-20 flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-semibold">projet</h1>
                        <Input
                            type="text"
                            className="border rounded px-4 py-2"
                            placeholder="Titre"
                            defaultValue="Formulaire de contact"
                            disabled
                        />
                    </div>
                    <Button className="bg-blue-900 rounded-sm text-white">Sauvegarder</Button>
                </div>
            </div>
            <div className="container mx-auto mt-10">
                <div className="border rounded p-6 text-center relative">
                    {!showQuestionInput  && (
                        <p className="text-gray-500">
                            Vous pouvez ajouter des questions, notes, messages-guide ou autres champs en cliquant sur le signe « + » plus bas.
                        </p>
                    )}
                    {showQuestionInput && (
                        <div className="flex justify-between items-center p-4 bg-white">
                            <Input type="text" className="flex-grow px-4 py-2 mr-2" placeholder="Votre libellé..." />
                            <Button className="bg-blue-900 rounded-sm text-white" onClick={handleAddTypeClick}>Ajouter un type</Button>
                            <Button variant="outline" className="ml-2" onClick={handleCloseClick}>
                                <X size={16} />
                            </Button>
                        </div>
                    )}
                    {!showQuestionInput && (
                        <Button
                            className="absolute left-0 top-7 transform translate-x-[-50%] translate-y-[-50%] rounded-full p-2 flex items-center justify-center bg-blue-900"
                            onClick={handleAddQuestionClick}
                        >
                            <Plus size={24} />
                        </Button>
                    )}
                </div>
                {showTypeOptions && (
                    <TypeOptions onSelectType={addField} />
                )}
                {fields.length > 0 && (
                    <div className="mt-7 border p-4">
                        {fields.map((field, index) => (
                            <FormField key={index} type={field.type} label={field.label} placeholder={field.placeholder} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
