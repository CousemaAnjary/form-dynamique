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

// récupérer la liste des projets
export const getProjects = async () => {
    try {
        // envoyer une requête GET au serveur pour récupérer la liste des projets
        const response = await api.get('/projects')
        return response.data.projects // retourner la liste des projets

    } catch (error) {
        console.error('Erreur lors de la récupération des projets : ', error)
    }
}

// récupérer un projet par son id
export const getProjectById = async (id) => {
    try {
        // envoyer une requête GET au serveur pour récupérer le projet par son id
        const response = await api.get(`/project/${id}`)
        return response.data.project // retourner le projet

    } catch (error) {
        console.error('Erreur lors de la récupération du projet : ', error)
    }
}