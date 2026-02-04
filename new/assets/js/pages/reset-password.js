import { patchRequest } from '../api.js';
import { addPasswordToggle } from '../toggle.js';

document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('resetUserId');
    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

    addPasswordToggle('newPass');
    addPasswordToggle('newPass2');

    const form = document.getElementById('container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const pass1 = document.getElementById('newPass').value.trim();
        const pass2 = document.getElementById('newPass2').value.trim();

        if (pass1 !== pass2) {
            Toastify({
                text: 'Şifreler eşleşmiyor!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
            }).showToast();
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(pass1)) {
            Toastify({
                text: 'Lütfen güvenliğiniz için en az 8 karakterden oluşan; büyük harf, küçük harf, rakam ve özel karakter içeren bir şifre belirleyin!',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
            }).showToast();
            return;
        }

        const updateData = { password: pass1 };
        const result = await patchRequest(`/users/${userId}`, updateData);
        localStorage.removeItem('resetUserId');
        if (result && result.id) {
            Toastify({
                text: 'Şifreniz başarıyla güncellendi! Giriş yapabilirsiniz.',
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style: { background: 'linear-gradient(to right, #87f38e, #75c9a2)' },
            }).showToast();

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            Toastify({
                text: 'Güncelleme sırasında bir hata oluştu.',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
            }).showToast();
        }
    });
});
