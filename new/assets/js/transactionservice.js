import { renderTransactions } from './render.js';
import { patchRequest, postRequest } from './api.js';

export async function transactionAdd() {
    const user = JSON.parse(localStorage.getItem('user'));
    let type = document.getElementById('type');
    let description = document.getElementById('descrip');
    let amount = document.getElementById('amount');

    description.classList.remove('error');
    amount.classList.remove('error');
    if (description.value.trim() == '' || amount.value.trim() == '') {
        Toastify({
            text: 'lütfen alanları doldurunuz!',
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #f19494, #ef3242)',
            },
        }).showToast();

        if (description.value.trim() == '') {
            description.classList.add('error');
        }
        if (amount.value.trim() == '') {
            amount.classList.add('error');
        }
        return;
    }

    // Açıklama için Regex Kontrolü (Sadece harf ve boşluk)
    const textRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
    if (!textRegex.test(description.value.trim())) {
        Toastify({
            text: 'Açıklama sadece harf ve boşluk içerebilir!',
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
        }).showToast();
        description.classList.add('error');
        return;
    }

    let transaction = {
        userId: user.id, // BURASI ÖNEMLİ: İşlemi kullanıcıya bağlıyoruz
        type: type.value.trim(),
        description: description.value.trim(),
        amount: Number(amount.value.trim()),
        date: new Date().toISOString(),
    };

    try {
        await postRequest('/transactions', transaction);
    } catch (error) {
        console.error('Ekleme hatası:', error);
    }

    description.value = '';
    amount.value = '';
    description.classList.remove('error');
    amount.classList.remove('error');
    renderTransactions();
    Toastify({
        text: 'İşlem başarıyla eklendi!',
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #87f38e, #75c9a2)',
        },
    }).showToast();
}

export async function transactionEdit(transactionid) {
    const response = await fetch(`http://localhost:3000/transactions/${transactionid}`);
    const transactionToEdit = await response.json();

    if (transactionToEdit) {
        const typeInput = document.getElementById('newType');
        const descInput = document.getElementById('editDescription');
        const amountInput = document.getElementById('editAmount');
        const hiddenId = document.getElementById('hiddenTransactionId');

        if (typeInput) typeInput.value = transactionToEdit.type;
        if (descInput) descInput.value = transactionToEdit.description;
        if (amountInput) amountInput.value = transactionToEdit.amount;
        if (hiddenId) hiddenId.value = transactionToEdit.id;

        document.getElementById('overlay').style.display = 'flex';
    }
}

export async function transactionUpdate() {
    let hiddenId = document.getElementById('hiddenTransactionId');
    let id = Number(hiddenId.value);

    let newType = document.getElementById('newType');
    let editDescription = document.getElementById('editDescription');
    let editAmount = document.getElementById('editAmount');

    editDescription.classList.remove('error');
    editAmount.classList.remove('error');

    if (editDescription.value.trim() == '' || editAmount.value.trim() == '') {
        if (editDescription.value.trim() == '') editDescription.classList.add('error');
        if (editAmount.value.trim() == '') editAmount.classList.add('error');
        Toastify({
            text: 'Lütfen tüm alanları doldurunuz!',
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
        }).showToast();
        return;
    }

    const textRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
    if (!textRegex.test(editDescription.value.trim())) {
        Toastify({
            text: 'Açıklama sadece harf ve boşluk içerebilir!',
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            style: { background: 'linear-gradient(to right, #f19494, #ef3242)' },
        }).showToast();
        editDescription.classList.add('error');
        return;
    }

    const updatedTransaction = {
        type: newType.value,
        description: editDescription.value,
        amount: Number(editAmount.value),
    };

    try {
        await patchRequest(`transactions/${id}`, updatedTransaction);

        document.getElementById('overlay').style.display = 'none';
        document.getElementById('newType').value = '';
        document.getElementById('editDescription').value = '';
        document.getElementById('editAmount').value = '';
        hiddenId.value = '';
        renderTransactions();
    } catch (error) {
        Toastify({
            text: 'Güncelleme hatası!',
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #f19494, #ef3242)',
            },
        }).showToast();
    }
}

export async function transactiondelete(id) {
    await fetch(`http://localhost:3000/transactions/${id}`, { method: 'DELETE' });

    renderTransactions();
}
