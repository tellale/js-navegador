// Requisitos indispensables
// La aplicación deberá mostrar en todo momento el total de gastos, ingresos y el dinero total que tenemos ahorrado.
// Podremos añadir un ingreso o un gasto incluyendo un concepto.
// Podremos borrar cualquier gasto o ingreso que hayamos introducido.
// Requisitos opcionales
// Si cerramos la web y volvemos a entrar, tenemos que recuperar todos los gastos e ingresos que habíamos introducido, así como el ahorro total.

const newTransactionFromElement = document.querySelector('#addNewTransaction')
const savingsList = document.querySelector('#savings-box')
const incomeList = document.querySelector('#income-box')
const expensesList = document.querySelector('#expenses-box')
const transactionRecords = document.querySelector('#history-records')
let entryList = []
let currentIncome = 0
let currentExpenses = 0
let currentSavings = 0

// When submit form saves thes concept and amount in an obj and push it to localStorage into a list.
// Triggers historyRecords at the end
newTransactionFromElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const conceptElement = document.querySelector('#concept');
    const amountElement = document.querySelector('#amount');
    const max = 100

    let transaction = {
        concept: conceptElement.value,
        amount: parseFloat(amountElement.value),
        id: Math.floor(Math.random() * max),
    }
    entryList.push(transaction)

    localStorage.setItem('transactionHistory', JSON.stringify(entryList));
    

    conceptElement.value = '';
    amountElement.value = '';

    historyRecords(transaction);
    sumIncomeExpenses(transaction);
    sumSavings(currentIncome, currentExpenses);
})

// takes a transaction. If amount is + will add to currentIncome and display under Income box. If - will add to current Expenses and display under Expenses box.
function sumIncomeExpenses(transaction) {
    const incomeElement = document.querySelector('#incomeElement')
    const expensesElement = document.querySelector('#expensesElement')
    
    if (transaction.amount > 0) {
        let incomeResult = currentIncome + parseFloat(transaction.amount)
        currentIncome = incomeResult

        let displayIncome = `
        <p>${incomeResult}€</p>
        `
        incomeElement.innerHTML = displayIncome;
        incomeList.appendChild(incomeElement);
    } else {
        let expensesResult = currentExpenses + (-parseFloat(transaction.amount))
        currentExpenses = expensesResult

        let displayExpenses = `
        <p>${expensesResult}€</p>
        `
        expensesElement.innerHTML = displayExpenses;
        expensesList.appendChild(expensesElement);
        
    }
}

// Takes total income and expenses; calculates and displays total savings
function sumSavings(income, expenses) {
    const savingsElement = document.querySelector('#savingsElement')
    let savingsResult = income - expenses

    let displaySavings = `
    <p>${savingsResult}€</p>
    `
    savingsElement.innerHTML = displaySavings;
    savingsList.appendChild(savingsElement);
}

// Takes a transaction as an argument, creates a 'li' and adds it to the 'ul' on the history section
function historyRecords(transaction) {
    const historyElement = document.createElement('li');

    historyElement.setAttribute('id', transaction.id)

    let transactionElement = `
    <div class="transactionElement">
        <p>${transaction.concept}</p>
        <p>${transaction.amount}</p>
        <button onclick = 'deleteTransactionFromHistory(${transaction.id}, ${transaction.amount})'>Delete Transaction</button>
    </div>
    `

    historyElement.innerHTML = transactionElement;

    transactionRecords.appendChild(historyElement);
}

// Deletes transaction from History when button is clicked. Triggers deletion of amount from income, expenses and savings
function deleteTransactionFromHistory(id, amount) {
    console.log(id);

    const removeConfirmation = window.confirm('Are you sure you want to delete the transaction?')

    if (removeConfirmation) {
        const transactionElement = document.getElementById(id);
        transactionElement.remove();
        deleteTransactionFromIncomeExpensesSavings(amount)
    }
}

// Deletes transacion amount from income, expenses or savings when transaction history is ereased. 
function deleteTransactionFromIncomeExpensesSavings(amount) {
    const incomeElement = document.querySelector('#incomeElement')
    const expensesElement = document.querySelector('#expensesElement')
    
    if (amount > 0) {
        let incomeResult = currentIncome - amount
        currentIncome = incomeResult

        let displayIncome = `
        <p>${incomeResult}€</p>
        `
        incomeElement.innerHTML = displayIncome;
        incomeList.appendChild(incomeElement);
    } else {
        let expensesResult = currentExpenses - (-amount)
        currentExpenses = expensesResult

        let displayExpenses = `
        <p>${expensesResult}€</p>
        `
        expensesElement.innerHTML = displayExpenses;
        expensesList.appendChild(expensesElement);
    }

    const savingsElement = document.querySelector('#savingsElement')
    let savingsResult = currentSavings - amount

    let displaySavings = `
    <p>${savingsResult}€</p>
    `
    savingsElement.innerHTML = displaySavings;
    savingsList.appendChild(savingsElement);
}