import api from './apiConfig'

// créer une nouvelle question
export const createQuestion = async (questionData) => {
    try {
        // envoyer une requête POST à l'API avec les données de la question
        const response = await api.post(`/project/${questionData.project_id}/question`, questionData)
        return response.data // retourner les données de la question
    } catch (error) {
        console.error('Erreur lors de la création de la question : ', error);
    }
}