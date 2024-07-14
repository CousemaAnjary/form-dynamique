import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '@/services/projectService';
import { getQuestions } from '@/services/questionService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from "lucide-react";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectResult = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

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
                return <Input type="text" name={name} placeholder={question.placeholder} className="mb-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />;
            case 'email':
                return <Input type="email" name={name} placeholder={question.placeholder} className="mb-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />;
            case 'password':
                return (
                    <div className="flex items-center mb-2">
                        <Input type={showPassword ? "text" : "password"} name={name} placeholder={question.placeholder} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                        <Button type="button" variant="outline" className="ml-2 p-2 shadow-sm" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </Button>
                    </div>
                );
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
                        <SelectTrigger className="mb-2 w-96 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
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
                return <Input type="file" name={name} className="mb-2 w-96 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />;
            case 'date':
                return <Input type="date" name={name} className="mb-2 w-36 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />;
            case 'number':
                return <Input type="number" name={name} className="mb-2 w-80 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />;
            default:
                return <Input type="text" name={name} placeholder={question.placeholder} className="mb-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />;
        }
    };

    if (!project) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-semibold text-center mb-8">{project.title}</h1>
            <form className="form-container bg-white p-8 shadow-sm rounded-md">
                {questions.length > 0 ? questions.map(question => (
                    <div key={question.id} className="mb-6">
                        <Label className="block mb-2 font-semibold text-gray-700">{question.label}</Label>
                        {renderInputField(question)}
                    </div>
                )) : <div className="text-gray-500">Ce formulaire est actuellement vide...</div>}
                <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Soumettre</Button>
            </form>
        </div>
    );
};

export default ProjectResult;
