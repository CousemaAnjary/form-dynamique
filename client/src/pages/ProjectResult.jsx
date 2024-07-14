import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '@/services/projectService';
import { getQuestions} from '@/services/questionService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectResult = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const projectData = await getProjectById(id);
                setProject(projectData);
                const questionsData = await getQuestions(id);
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
                return <Input type="text" name={name} placeholder={question.placeholder} className="mb-2 " />;
            case 'email':
                return <Input type="email" name={name} placeholder={question.placeholder} className="mb-2 " />;
            case 'password':
                return <Input type="password" name={name} placeholder={question.placeholder} className="mb-2 " />;
            case 'radio':
                return (
                    <RadioGroup name={name} className="mb-2">
                        {question.options.map(option => (
                            <div className="flex items-center space-x-2" key={option.value}>
                                <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                                <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                );
            case 'checkbox':
                return <Input type="checkbox" name={name} className="mb-2" />;
            case 'select':
                return (
                    <Select name={name} >
                        <SelectTrigger className="mb-2 w-80">
                            <SelectValue placeholder="Sélectionnez une option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {question.options.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                );
            case 'file':
                return <Input type="file" name={name} className="mb-2 w-80" />;
            case 'date':
                return <Input type="date" name={name} className="mb-2 w-40" />;
            case 'number':
                return <Input type="number" name={name} className="mb-2" />;
            default:
                return <Input type="text" name={name} placeholder={question.placeholder} className="mb-2" />;
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
                        <Label className="block mb-2 font-bold">{question.label}</Label>
                        {renderInputField(question)}
                    </div>
                ))}
                <Button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Soumettre</Button>
            </form>
        </div>
    );
};

export default ProjectResult;
