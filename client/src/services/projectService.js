import api from './apiConfig'

// créer une nouvelle projet
export const createProject = async (projectData) => {
    try {
        // envoyer les données du projet au serveur via une requête POST
        const response = await api.post('/project', projectData)
        return response.data // retourner les données du projet

    } catch (error) {
        console.error('Erreur lors de la création du projet : ', error)
    }
}