import api from './apiConfig'

// Créer une nouvelle question
export const createQuestion = async (questionData) => {
    try {
        // envoyer les données de la question au serveur via une requête POST
        const response = await api.post(`/question`, questionData)
        return response.data

    } catch (error) {
        console.error('Erreur lors de la création de la question : ', error)
    }
}

// Récupérer les questions par projet
export const getQuestions = async (projectId) => {
    try {
        const response = await api.get(`/project/${projectId}/questions`);
        return response.data.questions;
    } catch (error) {
        console.error('Erreur lors de la récupération des questions : ', error);
    }
};

// Mettre à jour une question
export const updateQuestion = async (id, questionData) => {
    try {
        const response = await api.put(`/question/${id}`, questionData);
        return response.data.question;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la question : ', error);
    }
};

// Supprimer une question
export const deleteQuestion = async (id) => {
    try {
        await api.delete(`/question/${id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de la question : ', error);
    }
};

// Mettre à jour la position d'une question
export const updateQuestionPosition = async (id, positionData) => {
    try {
        const response = await api.put(`/question/${id}/position`, positionData);
        return response.data.question;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la position de la question : ', error);
    }
};
