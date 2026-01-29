import { checkGuest, logout } from "../auth.js";
import { transactionAdd, transactionEdit, transactiondelete, transactionUpdate } from "../transactionservice.js";
import { renderTransactions} from "../render.js";

checkGuest();

document.addEventListener('DOMContentLoaded', () => {
    let logoutbtn=document.getElementById('logoutBtn');
    let addbtn=document.getElementById('addBtn');
    let updateBtn=document.getElementById('updateBtn');
    let cancelBtn=document.getElementById('cancelBtn');
    let transactionlist=document.getElementById('transactionList');
    
    renderTransactions();
    


    transactionlist.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-btn');
        const editBtn = e.target.closest('.edit-btn');

        if (deleteBtn) {
            const transactionid = deleteBtn.closest('.new-transaction').dataset.id;
            transactiondelete(transactionid);
        } else if (editBtn) {
            const transactionid = editBtn.closest('.new-transaction').dataset.id;
            transactionEdit(transactionid);
        }
    });

    addbtn.addEventListener('click', (e) => {
        e.preventDefault();
        transactionAdd();
    });

    if (updateBtn) {
        updateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            transactionUpdate();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            document.getElementById('overlay').style.display = 'none';
        });
    }

    logoutbtn.addEventListener('click', logout);
    










});
