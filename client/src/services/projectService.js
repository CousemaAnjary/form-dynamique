import api from './apiConfig'

// créer une nouvelle projet
export const createProject = async (projectData) => {
    try {
        // envoyer les données du projet au serveur via une requête POST
        const response = await api.post('/projects', projectData)
        return response.data // retourner les données du projet

    } catch (error) {
        console.error('Erreur lors de la création du projet : ', error)
    }
}

// récupérer la liste des projets
export const getProjects = async () => {
    try {
        // envoyer une requête GET au serveur pour récupérer la liste des projets
        const response = await api.get('/projects')
        return response.data // retourner la liste des projets

    } catch (error) {
        console.error('Erreur lors de la récupération des projets : ', error)
    }
}