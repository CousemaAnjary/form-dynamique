import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text, Mail, KeyRound, Radio, ListTodo, TextSelect, File, Calendar, Plus, X } from 'lucide-react';
import { TbNumber123 } from "react-icons/tb";

export default function NewForm() {
    const [showQuestionInput, setShowQuestionInput] = useState(false);
    const [showTypeOptions, setShowTypeOptions] = useState(false);

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
                <div className="border rounded p-4 text-center relative">
                    {!showQuestionInput && (
                        <p className="text-gray-500">
                            Ce formulaire est actuellement vide.
                            Vous pouvez ajouter des questions, notes, messages-guide ou autres champs en cliquant sur le signe « + » plus bas.
                        </p>
                    )}
                    {showQuestionInput && (
                        <div className="flex justify-between items-center p-4 bg-white">
                            <Input type="text" className="flex-grow  px-4 py-2 mr-2" placeholder="Votre libellé..." />
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
                    <div className="border rounded p-4 bg-white ">
                        <div className="grid grid-cols-3 gap-4">
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Text className="w-5 h-5" /> <span>Text</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Mail className="w-5 h-5" /> <span>Email</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <KeyRound className="w-5 h-5" /> <span>Password</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Radio className="w-5 h-5" /> <span>Radio</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <ListTodo className="w-5 h-5" /> <span>Checkox</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <TextSelect className="w-5 h-5" /> <span>Select</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <File className="w-5 h-5" /> <span>File</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5" /> <span>Date</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <TbNumber123 className="w-5 h-5" /> <span>Number</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
