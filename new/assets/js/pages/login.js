import { checkAuth, login } from "../auth.js";

checkAuth();
addEventListener('DOMContentLoaded', () => {
  
    const loginForm = document.getElementById('container');
    const emailInput = document.getElementById('userEmail');
    const passwordInput = document.getElementById('userPassword');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const response = await login(emailInput.value, passwordInput.value);
                if (response.success) {

                    window.location.href = 'transactions.html';
                } else {
                    console.log('Giriş yapılamadı: ' + (response.error || 'Hata'));
                }
            } catch (error) {
                console.error('Bir hata oluştu:', error);
            }
        });
    }
    

    


});