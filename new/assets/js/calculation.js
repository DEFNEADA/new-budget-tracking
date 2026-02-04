export function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
    }).format(amount);
}

export function calculations() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const totalincome = transactions
        .filter((item) => item.type == 'income')
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const totalexpense = transactions
        .filter((item) => item.type == 'expense')
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const totalbalance = totalincome - totalexpense;

    return { totalincome, totalexpense, totalbalance };
}
