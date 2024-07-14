import { Plus, X } from 'lucide-react'
import TypeOptions from './TypeOptions'
import { DndProvider } from 'react-dnd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import QuestionSettings from './QuestionSettings'
import DraggableFormField from './DraggableFormField'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getProjectById, completeProject } from '@/services/projectService'
import { getQuestionsByProjectId, createQuestion, updateQuestionPosition, deleteQuestion } from '@/services/questionService'



export default function FormContainer() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState(null)
    const [questions, setQuestions] = useState([])
    const [questionLabel, setQuestionLabel] = useState('')
    const [showTypeOptions, setShowTypeOptions] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [showQuestionInput, setShowQuestionInput] = useState(false)


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    useEffect(() => {
        // Fonction pour récupérer le projet par son id
        const fetchProject = async () => {
            try {
                // Récupérer le projet par son id depuis l'api
                const projectData = await getProjectById(id)
                setProject(projectData)

            } catch (error) {
                console.error('Erreur lors de la récupération du projet : ', error)
            }
        }

        // Fonction pour récupérer la liste des questions par le projet id
        const fetchQuestions = async () => {
            try {
                // Récupérer la liste des questions par le projet id depuis l'api
                const questionsData = await getQuestionsByProjectId(id)
                setQuestions(questionsData)
            } catch (error) {
                console.error('Erreur lors de la récupération des questions : ', error)
            }
        }

        fetchProject()
        fetchQuestions()
    }, [id]) // [id] pour exécuter le code une seule fois après le premier rendu


    // Fonction pour afficher le formulaire d'ajout de question
    const handleAddQuestionClick = () => {
        setShowQuestionInput(true)
        setShowTypeOptions(false)
    }

    // Fonction pour ajouter un type de champ
    const handleAddTypeClick = (type) => {
        handleAddField(type)
        setShowTypeOptions(false)
    }

    // Fonction pour fermer le formulaire d'ajout de question
    const handleCloseClick = () => {
        setShowQuestionInput(false)
        setShowTypeOptions(false)
        setQuestionLabel('')
    }

    // Fonction pour afficher les paramètres de la question
    const handleSettingsClick = (question) => {
        setSelectedQuestion(question)
    }

    // Fonction pour fermer les paramètres de la question
    const handleCloseSettings = () => {
        setSelectedQuestion(null)
    }

    // Fonction pour ajouter un champ
    const handleAddField = async (type) => {

        // Données à envoyer au serveur pour créer une question
        const questionData = {
            project_id: id,
            label: questionLabel || 'Default',
            type,
            required: false,
            position: questions.length,
        }

        try {
            // Appeler le service pour créer une question
            const response = await createQuestion(questionData)
            setQuestions([...questions, response.question]) // Ajouter la question à la liste des questions
            setQuestionLabel('')

        } catch (error) {
            console.error('Erreur lors de la création de la question : ', error)
        }
    }

    // Fonction pour supprimer une question
    const handleDeleteQuestion = async (id) => {

        try {
            await deleteQuestion(id)
            setQuestions(questions.filter(question => question.id !== id)) // Supprimer la question de la liste des questions

        } catch (error) {
            console.error('Erreur lors de la suppression de la question : ', error)
        }
    }

    // Fonction pour déplacer un champ
    const moveField = async (dragIndex, hoverIndex) => {

        const draggedField = questions[dragIndex] // Champ déplacé
        const updatedFields = [...questions] // Liste des champs mise à jour

        updatedFields.splice(dragIndex, 1) // Supprimer le champ déplacé
        updatedFields.splice(hoverIndex, 0, draggedField) // Ajouter le champ déplacé à la nouvelle position

        // Mettre à jour les positions dans la base de données
        for (let i = 0; i < updatedFields.length; i++) {
            await updateQuestionPosition(updatedFields[i].id, { position: i })
        }

        setQuestions(updatedFields) // Mettre à jour la liste des champs
    }

    // Fonction pour finaliser le projet
    const handleSaveForm = async () => {
        try {
            // 
            await completeProject(id)
            navigate(`/project/${id}/completed`)

        } catch (error) {
            console.error('Erreur lors de la finalisation du projet : ', error)
        }
    };
    /**
     * ! AFFICHAGE (render) de l'application
     */

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
                                value={questionLabel}
                                onChange={(e) => setQuestionLabel(e.target.value)}
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
