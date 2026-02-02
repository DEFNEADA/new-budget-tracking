import { register, checkAuth } from '../auth.js';

checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('container');
    if (!registerForm) return console.error("HATA: 'container' ID'li form bulunamadı!");

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('userEmail');
        const passInput = document.getElementById('userPassword');
        const pass2Input = document.getElementById('userPassword2');

        if (!emailInput || !passInput || !pass2Input) {
            Toastify({
                text: 'Lütfen tüm alanları doldurunuz!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #f19494, #ef3242)',
                },
            }).showToast();
            return;
        }

        const email = emailInput.value.trim().toLowerCase();
        const password = passInput.value.trim();
        const password2 = pass2Input.value.trim();

        if (password !== password2) {
            Toastify({
                text: 'Şifreler eşleşmiyor!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #f19494, #ef3242)',
                },
            }).showToast();
            return;
        }

        try {
            const response = await register(email, password);

            if (response.success) {
                // Token varsa kaydet (Otomatik giriş yap)
                if (response.data && response.data.accessToken) {
                    localStorage.setItem('userToken', response.data.accessToken);
                    if (response.data.user) {
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    }
                }
                // 1. Başarılı Toast Mesajı
                Toastify({
                    text: 'Kayıt başarılı! Yönlendiriliyorsunuz...',
                    duration: 2000, // Mesaj 2 saniye ekranda kalır
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #87f38e, #75c9a2)' },
                }).showToast();

                // 2. Yönlendirmeyi Geciktir (Kritik Nokta)
                setTimeout(() => {
                    window.location.href = 'transactions.html';
                }, 2000); // 2000ms (2 saniye) bekleyip öyle yönlendirir
            } else {
                const errorMsg = response.error || 'Hata';
                let displayMessage = errorMsg;

                if (errorMsg.includes('Password is too short')) {
                    displayMessage = 'Şifre en az 6 karakter olmalıdır!';
                } else if (errorMsg.includes('Email is invalid')) {
                    displayMessage = 'Geçersiz e-posta adresi!';
                } else if (errorMsg.includes('Email already exists')) {
                    displayMessage = 'Bu e-posta adresi zaten kullanımda!';
                } else if (errorMsg.includes('Email format is invalid')) {
                    displayMessage = 'Geçersiz e-posta adresi!';
                } else {
                    displayMessage = errorMsg;
                }

                Toastify({
                    text: displayMessage || 'Kayıt başarısız!',
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
                }).showToast();
            }
        } catch (error) {
            Toastify({
                text: 'Bir hata oluştu, lütfen tekrar deneyin!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #f19494, #ef3242)',
                },
            }).showToast();
        }
    });
});
