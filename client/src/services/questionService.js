import api from './apiConfig'

// créer une nouvelle question
export const createQuestion = async (questionData) => {
    try {
        const response = await api.post(`/project/${questionData.project_id}/question`, questionData);
        return response.data.question;
    } catch (error) {
        console.error('Erreur lors de la création de la question : ', error);
    }
}

// récupérer les questions par projet
export const getQuestionsByProjectId = async (projectId) => {
    try {
        const response = await api.get(`/project/${projectId}/questions`);
        return response.data.questions;
    } catch (error) {
        console.error('Erreur lors de la récupération des questions : ', error);
    }
}

// mettre à jour une question
export const updateQuestion = async (id, questionData) => {
    try {
        const response = await api.put(`/question/${id}`, questionData);
        return response.data.question;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la question : ', error);
    }
}

// supprimer une question
export const deleteQuestion = async (id) => {
    try {
        await api.delete(`/question/${id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de la question : ', error);
    }
}