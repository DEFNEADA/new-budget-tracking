import { checkAuth, login } from '../auth.js';
import { addPasswordToggle } from '../toggle.js';

checkAuth();
addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('container');
    const emailInput = document.getElementById('userEmail');
    const passwordInput = document.getElementById('userPassword');

    if (!loginForm) console.error("HATA: 'container' ID'li form bulunamadı!");
    if (!emailInput) console.error("HATA: 'userEmail' ID'li input bulunamadı!");
    if (!passwordInput) console.error("HATA: 'userPassword' ID'li input bulunamadı!");

    addPasswordToggle('userPassword');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                Toastify({
                    text: 'Lütfen tüm alanları doldurunuz!',
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
                }).showToast();
                return;
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                Toastify({
                    text: 'Geçerli bir e-posta adresi giriniz!',
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
                }).showToast();
                return;
            }

            try {
                const response = await login(email, password);
                if (response.success) {
                    Toastify({
                        text: 'Giriş başarılı! Yönlendiriliyorsunuz...',
                        duration: 2000,
                        gravity: 'bottom',
                        position: 'right',
                        style: {
                            background: 'linear-gradient(to right, #87f38e, #75c9a2)',
                        },
                    }).showToast();

                    setTimeout(() => {
                        window.location.href = 'transactions.html';
                    }, 2000);
                } else {
                    const errorMsg = response.error || 'Hata';

                    let displayMessage = errorMsg;

                    if (errorMsg.includes('Cannot find user')) {
                        displayMessage = 'Kullanıcı bulunamadı! E-postanızı kontrol edin.';
                    } else {
                        displayMessage = 'Şifre hatalı!';
                    }

                    Toastify({
                        text: displayMessage,
                        duration: 3000,
                        gravity: 'bottom',
                        position: 'right',
                        style: {
                            background: 'linear-gradient(to right, #f19494, #ef3242)',
                        },
                    }).showToast();
                }
            } catch (error) {
                console.error('Bir hata oluştu:', error);
            }
        });
    }
});
