import axios from 'axios';


// Récupérer l'URL de base de l'API à partir des variables d'environnement
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;