const API_URL = 'https://mlpc-backend.onrender.com'; // Replace with your server IP
// const API_URL = 'http://192.168.29.124:8000'; // Replace with your server IP
const TIMEOUT = 10000;
import * as SecureStore from 'expo-secure-store';

export const fetchWithTimeout = async (endpoint, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    try {
        // Get session cookie from SecureStore
        let sessionCookie = null;
        try {
            sessionCookie = await SecureStore.getItemAsync('session');
        } catch {}

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(sessionCookie ? { 'Cookie': `session=${sessionCookie}` } : {}),
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