const API_URL = 'https://mlpc-backend.onrender.com'; // Replace with your server IP
// const API_URL = 'http://192.168.29.124:8000'; // Replace with your server IP
const TIMEOUT = 10000;

export const fetchWithTimeout = async (endpoint, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

export const fetchData = {
    getMediaLeaders: () => fetchWithTimeout('/medialeaders/today'),
    getCulturalInfluencers: () => fetchWithTimeout('/culturalinfluencers/today'),
};