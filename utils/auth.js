import axios from 'axios';
import * as Keychain from 'react-native-keychain';

// Store token after login (done in SignIn.jsx above)
export async function setAuthToken(token) {
  await Keychain.setGenericPassword('session', token);
}

// Retrieve token for API requests
export async function getAuthToken() {
  const tokenData = await Keychain.getGenericPassword();
  return tokenData ? tokenData.password : null;
}

// Attach Authorization header for authenticated API requests
export async function getAuthHeaders() {
  const token = await getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

// Example usage for protected API call:
export async function fetchProtectedData(url, options = {}) {
  const headers = await getAuthHeaders();
  return axios.get(url, { ...options, headers: { ...options.headers, ...headers } });
}

// Remove token on logout
export async function removeAuthToken() {
  await Keychain.resetGenericPassword();
}
