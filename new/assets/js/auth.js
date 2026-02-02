import { postRequest } from './api.js';

export async function login(email, password) {
    const result = await postRequest('/login', { email, password });

    if (result.accessToken) {
        localStorage.setItem('userToken', result.accessToken);
        if (result.user) {
            localStorage.setItem('user', JSON.stringify(result.user));
        }
        return { success: true };
    } else {
        return { success: false, error: result.error };
    }
}

export async function register(email, password) {
    const response = await postRequest('/register', { email, password });

    if (response && !response.error) {
        return { success: true, data: response };
    } else {
        return { success: false, error: response.error };
    }
}

export function logout() {
    localStorage.removeItem('userToken');
    window.location.href = 'login.html';
}

export function checkGuest() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = 'login.html';
    }
}

export function checkAuth() {
    const token = localStorage.getItem('userToken');
    if (token) {
        window.location.href = 'transactions.html';
    }
}
