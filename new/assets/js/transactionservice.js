import { renderTransactions} from "./render.js";

export function transactionAdd(){
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    

    let type=document.getElementById('type');
    let description=document.getElementById('descrip');
    let amount=document.getElementById('amount');

    if(description.value=='' || amount.value ==''){
         alert('Alanları doldurunuz!');
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
    renderTransactions();
}


export function transactionEdit(transactionid) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const transactionToEdit = transactions.find(item => item.id == transactionid);

    if (transactionToEdit) {

        const typeInput = document.getElementById('newType');
        const descInput = document.getElementById('editDescription');
        const amountInput = document.getElementById('editAmount');
        let updateBtn = document.getElementById('updateBtn');


        if (typeInput) typeInput.value = transactionToEdit.type;
        if (descInput) descInput.value = transactionToEdit.description;
        if (amountInput) amountInput.value = transactionToEdit.amount;
        if(updateBtn) updateBtn.dataset.id=transactionToEdit.id;
        
        document.getElementById('overlay').style.display = 'flex';
    }
}

export function transactionUpdate() {
    let updateBtn = document.getElementById('updateBtn');
    let id = updateBtn.dataset.id;
    
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
        updateBtn.dataset.id = '';
        renderTransactions();
        
    }
}

export function transactiondelete(id) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(item => item.id != id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
}
