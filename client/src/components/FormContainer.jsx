import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from 'lucide-react';
import TypeOptions from './TypeOptions';
import DraggableFormField from './DraggableFormField';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getProjectById } from '@/services/projectService';
import { useParams } from 'react-router-dom';

export default function FormContainer() {
    const { id } = useParams(); // Récupérer l'ID du projet depuis l'URL
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectById(id);
                setProject(projectData);
            } catch (error) {
                console.error('Erreur lors de la récupération du projet : ', error);
            }
        };

        fetchProject();
    }, [id]);

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
        setFields([...fields, { id: fields.length, type, label: 'Nom', placeholder: 'indice de question' }]);
        setShowQuestionInput(false);
        setShowTypeOptions(false);
    };

    const moveField = (dragIndex, hoverIndex) => {
        const draggedField = fields[dragIndex];
        const updatedFields = [...fields];
        updatedFields.splice(dragIndex, 1);
        updatedFields.splice(hoverIndex, 0, draggedField);
        setFields(updatedFields);
    };

    if (!project) return <div>Chargement...</div>;

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
                            value={project.title} // Afficher le titre du projet
                            disabled
                        />
                    </div>
                    <Button className="bg-blue-900 rounded-sm text-white">Sauvegarder</Button>
                </div>
            </div>
            <div className="container mx-auto mt-10">
                <div className="border rounded p-6 text-center relative">
                    {!showQuestionInput && (
                        <p className="text-gray-500">
                            Ce formulaire est actuellement vide.
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
                        <DndProvider backend={HTML5Backend}>
                            {fields.map((field, index) => (
                                <DraggableFormField
                                    key={field.id}
                                    id={field.id}
                                    index={index}
                                    type={field.type}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    moveField={moveField}
                                />
                            ))}
                        </DndProvider>
                    </div>
                )}
            </div>
        </>
    );
}
