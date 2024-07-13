import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from 'lucide-react';
import TypeOptions from './TypeOptions';
import DraggableFormField from './DraggableFormField';
import QuestionSettings from './QuestionSettings';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getProjectById, completeProject } from '@/services/projectService'; // Ajoutez completeProject ici
import { getQuestionsByProjectId, createQuestion, updateQuestionPosition, deleteQuestion } from '@/services/questionService';
import { useParams } from 'react-router-dom';


export default function FormContainer() {
    const { id } = useParams(); // Récupérer l'ID du projet depuis l'URL
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [questionLabel, setQuestionLabel] = useState(''); // Ajoutez cet état pour le libellé de la question
    const [selectedQuestion, setSelectedQuestion] = useState(null); // État pour la question sélectionnée

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectById(id);
                setProject(projectData);
            } catch (error) {
                console.error('Erreur lors de la récupération du projet : ', error);
            }
        };

        const fetchQuestions = async () => {
            try {
                const questionsData = await getQuestionsByProjectId(id);
                setQuestions(questionsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des questions : ', error);
            }
        };

        fetchProject();
        fetchQuestions();
    }, [id]);

    const [showQuestionInput, setShowQuestionInput] = useState(false);
    const [showTypeOptions, setShowTypeOptions] = useState(false);

    const handleAddQuestionClick = () => {
        setShowQuestionInput(true);
        setShowTypeOptions(false);
    };

    const handleAddTypeClick = (type) => {
        addField(type);
        setShowTypeOptions(false);
    };

    const handleCloseClick = () => {
        setShowQuestionInput(false);
        setShowTypeOptions(false);
        setQuestionLabel(''); // Réinitialiser le libellé de la question
    };

    const addField = async (type) => {
        const newQuestion = {
            label: questionLabel || 'Nom', // Utilisez la valeur de questionLabel
            type,
            required: false,
            position: questions.length,
            project_id: id,
        };
        try {
            const createdQuestion = await createQuestion(newQuestion);
            setQuestions([...questions, createdQuestion]);
            setQuestionLabel(''); // Réinitialiser le libellé après l'ajout
        } catch (error) {
            console.error('Erreur lors de la création de la question : ', error);
        }
    };

    const moveField = async (dragIndex, hoverIndex) => {
        const draggedField = questions[dragIndex];
        const updatedFields = [...questions];
        updatedFields.splice(dragIndex, 1);
        updatedFields.splice(hoverIndex, 0, draggedField);

        // Mettre à jour les positions dans la base de données
        for (let i = 0; i < updatedFields.length; i++) {
            await updateQuestionPosition(updatedFields[i].id, { position: i });
        }

        setQuestions(updatedFields);
    };

    const handleSettingsClick = (question) => {
        setSelectedQuestion(question);
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id);
            setQuestions(questions.filter(question => question.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la question : ', error);
        }
    };

    const handleCloseSettings = () => {
        setSelectedQuestion(null)
    }

    const handleSaveForm = async () => {
        try {
            await completeProject(id);
            navigate(`/project/${id}/completed`);
        } catch (error) {
            console.error('Erreur lors de la finalisation du projet : ', error);
        }
    };

    if (!project) return <div>Chargement...</div>

    return (
        <>
            <div className="shadow">
                <div className="container-fluid mx-20 flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2">
                        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-2xl font-serif">Projet</h1>
                        <Input
                            type="text"
                            className="border rounded px-4 py-2"
                            placeholder="Titre"
                            value={project.title}
                            disabled
                        />
                    </div>
                    <Button className="bg-blue-900 rounded-sm text-white" onClick={handleSaveForm}>Sauvegarder</Button>
                </div>
            </div>
            <div className="container mx-auto mt-10">
                <div className="border rounded p-6 text-center relative">
                    {!showQuestionInput && (
                        <p className="text-gray-500">
                            Vous pouvez ajouter des questions, notes, messages-guide ou autres champs en cliquant sur le signe « + » plus bas.
                        </p>
                    )}
                    {!showQuestionInput && (
                        <Button
                            className="absolute left-0 top-9 transform translate-x-[-50%] translate-y-[-50%] rounded-full p-2 flex items-center justify-center bg-blue-900"
                            onClick={handleAddQuestionClick}
                        >
                            <Plus size={24} />
                        </Button>
                    )}
                    {showQuestionInput && (
                        <div className="flex justify-between items-center p-2 bg-white ">
                            <Input
                                type="text"
                                className="flex-grow px-4 py-2 mr-2 shadow-sm"
                                placeholder="Veuillez saisir le libellé de la question"
                                value={questionLabel} // Lier l'input à l'état questionLabel
                                onChange={(e) => setQuestionLabel(e.target.value)} // Mettre à jour l'état questionLabel
                            />
                            <Button className="bg-blue-900 rounded-sm text-white" size="sm" onClick={() => setShowTypeOptions(true)}>Ajouter un type</Button>
                            <Button variant="outline" size="sm" className="ml-2 p-2" onClick={handleCloseClick}>
                                <X size={16} />
                            </Button>
                        </div>
                    )}
                </div>

                {showTypeOptions && (
                    <TypeOptions onSelectType={handleAddTypeClick} />
                )}

                {questions.length > 0 && (

                    <div className="mt-7 border p-4">
                        <DndProvider backend={HTML5Backend}>
                            {questions.map((field, index) => (
                                <div key={field.id}>
                                    <DraggableFormField
                                        id={field.id}
                                        index={index}
                                        type={field.type}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        moveField={moveField}
                                        onSettingsClick={() => handleSettingsClick(field)}
                                        onDelete={() => handleDeleteQuestion(field.id)}
                                    />
                                    {selectedQuestion && selectedQuestion.id === field.id && (
                                        <QuestionSettings
                                            question={selectedQuestion}
                                            onClose={handleCloseSettings}
                                        />
                                    )}
                                </div>
                            ))}
                        </DndProvider>
                    </div>
                )}
            </div>
        </>
    );
}
