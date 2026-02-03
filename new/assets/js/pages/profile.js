import { checkGuest, logout } from '../auth.js';
import { patchRequest, postRequest } from '../api.js';

checkGuest();
addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', logout);

    const updateBtn = document.getElementById('updateProfileBtn');
    const userData = JSON.parse(localStorage.getItem('user'));
    const emailInput = document.getElementById('profileEmail');
    if (userData && userData.email) {
        emailInput.value = userData.email;
    }

    updateBtn.addEventListener('click', async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
            logout(); // Kullanıcı verisi yoksa çıkışa zorla
            return;
        }

        const newPassword = document.getElementById('newPassword').value;
        const newPassword2 = document.getElementById('newPassword2').value;

        if (!newPassword || !newPassword2) {
            Toastify({
                text: 'Lütfen yeni şifrenizi giriniz!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #f19494, #ef3242)',
                },
            }).showToast();
            return;
        }
        const checkLogin = await postRequest('/login', { email: user.email, password: newPassword });
        if (checkLogin.accessToken) {
            Toastify({
                text: 'Yeni şifre eski şifrenizle aynı olamaz!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #f19494, #ef3242)',
                },
            }).showToast();
            return;
        }

        if (newPassword !== newPassword2) {
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

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            Toastify({
                text: 'Lütfen güvenliğiniz için en az 6 karakterden oluşan; büyük harf, küçük harf, rakam ve özel karakter içeren bir şifre belirleyin!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #f19494, #ef3242)',
                },
            }).showToast();
            return;
        }

        const updateData = { password: newPassword };
        try {
            const updatedUser = await patchRequest(`/users/${user.id}`, updateData);
            if (updatedUser && updatedUser.id) {
                user.password = newPassword;
                localStorage.setItem('user', JSON.stringify(user));
                Toastify({
                    text: 'şifreniz değiştirildi!',
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: {
                        background: 'linear-gradient(to right, #87f38e, #75c9a2)',
                    },
                }).showToast();
            } else {
                const errorMsg = updatedUser && updatedUser.error ? updatedUser.error : 'Güncelleme başarısız oldu!';
                let displayMessage = errorMsg;

                if (errorMsg.includes('Password is too short')) {
                    displayMessage = 'Şifre en az 6 karakter olmalıdır!';
                } else if (errorMsg.includes('Email is invalid') || errorMsg.includes('Email format is invalid')) {
                    displayMessage = 'Geçersiz e-posta adresi!';
                } else if (errorMsg.includes('Email already exists')) {
                    displayMessage = 'Bu e-posta adresi zaten kullanımda!';
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
        } catch (err) {
            Toastify({
                text: 'Bir hata oluştu!',
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
