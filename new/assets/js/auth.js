import { postRequest } from "./api.js";  

export async function login(email, password) {
    const result = await postRequest('/login', { email, password });


    if (result.token) {
        localStorage.setItem('userToken', result.token);
        return { success: true };
    } else {
        return { success: false, error: result.error };
    }
}


export function logout() {
    localStorage.removeItem('userToken');
    window.location.href = 'login.html';
}
    
export function checkGuest(){
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = 'login.html';
    }
}

export function checkAuth(){
    const token = localStorage.getItem('userToken');
    if (token) {
        window.location.href = 'transactions.html';
    }
}
