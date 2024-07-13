import axios from 'axios';

const BASE_URL = '/api'; // Assurez-vous que cette URL correspond à la configuration de votre API

// Créer une nouvelle option
export const createOption = async (questionId, optionData) => {
    try {
        const response = await axios.post(`${BASE_URL}/question/${questionId}/option`, optionData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'option :', error);
        throw error;
    }
};

// Récupérer toutes les options pour une question
export const getOptionsByQuestionId = async (questionId) => {
    try {
        const response = await axios.get(`${BASE_URL}/question/${questionId}/options`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des options :', error);
        throw error;
    }
};

// Mettre à jour une option
export const updateOption = async (optionId, optionData) => {
    try {
        const response = await axios.put(`${BASE_URL}/option/${optionId}`, optionData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'option :', error);
        throw error;
    }
};

// Supprimer une option
export const deleteOption = async (optionId) => {
    try {
        await axios.delete(`${BASE_URL}/option/${optionId}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'option :', error);
        throw error;
    }
};
