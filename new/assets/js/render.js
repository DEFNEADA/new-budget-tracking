import { calculations, formatCurrency } from './calculation.js';
export function renderTransactions() {
    let transactionlist = document.getElementById('transactionList');

    const translations = {
        food: 'Yemek',
        rent: 'Kira',
        bills: 'Faturalar',
        transport: 'Ulaşım',
        shopping: 'Alışveriş',
        salary: 'Maaş',
        education: 'Eğitim',
        health: 'Sağlık',
        entertainment: 'Eğlence',
        other: 'Diğer',
    };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const { totalbalance, totalincome, totalexpense } = calculations();
    if (!transactionlist) return;
    transactionlist.innerHTML = '';

    const fragment = document.createDocumentFragment();

    transactions.map(function (transaction) {
        const newtransaction = document.createElement('div');
        newtransaction.setAttribute('data-id', transaction.id);
        newtransaction.classList.add('new-transaction');

        if (transaction.type == 'income') {
            newtransaction.classList.add('income');
        } else {
            newtransaction.classList.add('expense');
        }

        newtransaction.innerHTML = `
    <span class="transaction-text"></span>
    <span class="buttons">
        <button class='edit-btn'><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button class='delete-btn'>&times;</button>
    </span>
`;
        newtransaction.querySelector('.transaction-text').textContent =
            `${translations[transaction.description]} : ${formatCurrency(transaction.amount)}`;
        fragment.appendChild(newtransaction);
    });

    transactionlist.appendChild(fragment);

    const totalCard = document.getElementById('totalBalance');
    const incomeCard = document.getElementById('incomeCard');
    const expenseCard = document.getElementById('expenseCard');

    totalCard.querySelector('span').textContent = `${formatCurrency(totalbalance)}`;
    incomeCard.querySelector('span').textContent = `${formatCurrency(totalincome)}`;
    expenseCard.querySelector('span').textContent = `${formatCurrency(totalexpense)}`;
}
