import { renderTransactions} from "./render.js";

export function transactionAdd(){
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    

    let type=document.getElementById('type');
    let description=document.getElementById('descrip');
    let amount=document.getElementById('amount');

    description.classList.remove('error');
    amount.classList.remove('error');

    if(description.value.trim()=='' || amount.value.trim() ==''){
        Toastify({
    text: "lütfen alanları doldurunuz!",
    duration: 3000, 
    gravity:"bottom", 
    position: "right",
    style: {
    background: "linear-gradient(to right, #f19494, #ef3242)",
    }
    }).showToast();

    if(description.value.trim()==''){
        description.classList.add('error');
    }
    if(amount.value.trim()==''){
        amount.classList.add('error');
    }
    return;
    }
    let transaction={
        id:Date.now(),
        type:type.value.trim(),
        description:description.value.trim(),
        amount: Number(amount.value.trim())
    }

    transactions.push(transaction);
    localStorage.setItem('transactions',JSON.stringify(transactions));
    
    description.value='';
    amount.value='';
    description.classList.remove('error');
    amount.classList.remove('error');
    renderTransactions();
    Toastify({
    text: "İşlem başarıyla eklendi!",
    duration: 3000, 
    gravity:"bottom", 
    position: "right",
    style: {
    background: "linear-gradient(to right, #87f38e, #75c9a2)",
    }
    }).showToast();
}


export function transactionEdit(transactionid) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const transactionToEdit = transactions.find(item => item.id == Number(transactionid));

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

export function transactionUpdate() {
    let hiddenId = document.getElementById('hiddenTransactionId');
    let id = Number(hiddenId.value);
    
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let index = transactions.findIndex(item => item.id == id);

    if (index !== -1) {
        transactions[index].type = document.getElementById('newType').value;
        transactions[index].description = document.getElementById('editDescription').value;
        transactions[index].amount = Number(document.getElementById('editAmount').value);
        
        localStorage.setItem('transactions', JSON.stringify(transactions));
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('newType').value = '';
        document.getElementById('editDescription').value = '';
        document.getElementById('editAmount').value = '';
        hiddenId.value = '';
        renderTransactions();
        
    } else {
    
        Toastify({
     text: "Güncellenecek kayıt bulunamadı!",
     duration: 3000, 
     gravity:"bottom",
     position: "right", 
     style: {
     background: "linear-gradient(to right, #f19494, #ef3242)",
    }
    }).showToast();
     }
}

export function transactiondelete() {
    let hiddenId = document.getElementById('hiddenTransactionId');
    let id = Number(hiddenId.value);
    
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(item => item.id != id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    hiddenId.value = '';
    renderTransactions();
}
