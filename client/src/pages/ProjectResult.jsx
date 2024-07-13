import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '@/services/projectService';
import { getQuestionsByProjectId } from '@/services/questionService';

const ProjectResult = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const projectData = await getProjectById(id);
                setProject(projectData);
                const questionsData = await getQuestionsByProjectId(id);
                setQuestions(questionsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du projet : ', error);
            }
        };

        fetchProjectData();
    }, [id]);

    const formatName = (label) => {
        return label.toLowerCase().replace(/ /g, '_');
    };


    const renderInputField = (question) => {
        const name = formatName(question.label);
        switch (question.type) {
            case 'text':
                return <input type="text" name={name} placeholder={question.placeholder} className="border rounded px-4 py-2" />;
            case 'email':
                return <input type="email" name={name} placeholder={question.placeholder} className="border rounded px-4 py-2" />;
            case 'password':
                return <input type="password" name={name} placeholder={question.placeholder} className="border rounded px-4 py-2" />;
            case 'radio':
                return (
                    question.options.map(option => (
                        <label key={option.value}>
                            <input type="radio" name={name} value={option.value} />
                            {option.label}
                        </label>
                    ))
                );
            case 'checkbox':
                return <input type="checkbox" name={name} className="border rounded px-4 py-2" />;
            case 'select':
                return (
                    <select name={name} className="border rounded px-4 py-2">
                        {question.options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );
            case 'file':
                return <input type="file" name={name} className="border rounded px-4 py-2" />;
            case 'date':
                return <input type="date" name={name} className="border rounded px-4 py-2" />;
            case 'number':
                return <input type="number" name={name} className="border rounded px-4 py-2" />;
            default:
                return <input type="text" name={name} placeholder={question.placeholder} className="border rounded px-4 py-2" />;
        }
    };

    if (!project) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <form>
                {questions.map(question => (
                    <div key={question.id} className="mb-4">
                        <label className="block mb-2 font-bold">{question.label}</label>
                        {renderInputField(question)}
                    </div>
                ))}
                <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Soumettre</button>
            </form>
        </div>
    );
};

export default ProjectResult;
