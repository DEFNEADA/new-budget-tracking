document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('container');
    const emailInput = document.getElementById('resetEmail');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim().toLowerCase();

        if (!email) {
            Toastify({
                text: 'Lütfen e-posta adresinizi giriniz.',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
            }).showToast();
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users?email=${email}`);
            if (!response.ok) {
                throw new Error('Sunucu hatası');
            }
            const users = await response.json();

            if (users.length > 0) {
                Toastify({
                    text: 'Kullanıcı doğrulandı, yönlendiriliyorsunuz...',
                    duration: 2000,
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #87f38e, #75c9a2)' },
                }).showToast();

                setTimeout(() => {
                    // ID'yi URL'in sonuna ?id=... şeklinde ekliyoruz
                    window.location.href = `reset-password.html?id=${users[0].id}`;
                }, 2000);
            } else {
                Toastify({
                    text: 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.',
                    duration: 3000,
                    gravity: 'bottom',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
                }).showToast();
            }
        } catch (error) {
            console.error('Hata:', error);
            Toastify({
                text: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.',
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
            }).showToast();
        }
    });
});
