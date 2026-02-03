import { patchRequest, postRequest } from '../api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Adres çubuğundaki ?id=... kısmını okuyoruz
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

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

        try {
            // Kullanıcının mevcut şifresini kontrol etmek için veriyi çekiyoruz
            const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
            if (userResponse.ok) {
                const user = await userResponse.json();

                // Şifre kontrolü: Hash'li şifreler için /login endpoint'ini kullanıyoruz
                const checkLogin = await postRequest('/login', { email: user.email, password: pass1 });

                if (checkLogin.accessToken) {
                    /*Eğer sistem "Giriş Başarılı" derse (accessToken verirse), 
                                                                                demek ki yazdığı yeni şifre aslında eski şifresiyle aynı!*/
                    Toastify({
                        text: 'Yeni şifre eski şifrenizle aynı olamaz!',
                        duration: 3000,
                        gravity: 'bottom',
                        position: 'right',
                        style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
                    }).showToast();
                    return;
                }
            }

            const updateData = { password: pass1 };
            const result = await patchRequest(`/users/${userId}`, updateData);

            if (result && result.id) {
                Toastify({
                    text: 'Şifreniz başarıyla güncellendi! Giriş yapabilirsiniz.',
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #87f38e, #75c9a2)' },
                }).showToast();

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            } else {
                Toastify({
                    text: 'Güncelleme sırasında bir hata oluştu.',
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
                }).showToast();
            }
        } catch (error) {
            console.error(error);
        }
    });
});
