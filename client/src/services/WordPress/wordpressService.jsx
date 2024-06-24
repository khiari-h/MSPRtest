import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('auth_token');

const wordpressService = {
    getData: async (endpoint) => {
        try {
            const response = await axios.get(`${API_URL}/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            throw error;
        }
    }
};

export default wordpressService;
