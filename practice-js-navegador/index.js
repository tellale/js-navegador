// Requisitos indispensables
// La aplicación deberá mostrar en todo momento el total de gastos, ingresos y el dinero total que tenemos ahorrado.
// Podremos añadir un ingreso o un gasto incluyendo un concepto.
// Podremos borrar cualquier gasto o ingreso que hayamos introducido.
// Requisitos opcionales
// Si cerramos la web y volvemos a entrar, tenemos que recuperar todos los gastos e ingresos que habíamos introducido, así como el ahorro total.

const newTransactionFromElement = document.querySelector('#addNewTransaction')
const incomeList = document.querySelector('#income-box')
const expensesList = document.querySelector('#expenses-box')
const transactionRecords = document.querySelector('#history-records')
let entryList = []
let currentIncome = 0
let currentExpenses = 0

// When submit form saves thes concept and amount in an obj and push it to localStorage into a list.
// Triggers historyRecords at the end
newTransactionFromElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const conceptElement = document.querySelector('#concept');
    const amountElement = document.querySelector('#amount');

    let transaction = {
        concept: conceptElement.value,
        amount: parseFloat(amountElement.value),
    }
    entryList.push(transaction)

    localStorage.setItem('transactionHistory', JSON.stringify(entryList));
    

    conceptElement.value = '';
    amountElement.value = '';

    historyRecords(transaction);
    sumIncomeExpenses(transaction);
})

// get amount added
// if positive sum with current income
// if negative sum it with current expenses

function sumIncomeExpenses(transaction) {
    const incomeElement = document.querySelector('#incomeElement')
    const expensesElement = document.querySelector('#expensesElement')

    if (transaction.amount > 0) {
        let incomeResult = currentIncome + parseFloat(transaction.amount)
        currentIncome = incomeResult

        let displayIncome = `
        <p>${incomeResult}</p>
        `
        incomeElement.innerHTML = displayIncome;
        incomeList.appendChild(incomeElement);
    } else {
        let expensesResult = currentExpenses + parseFloat(transaction.amount)
        currentExpenses = expensesResult

        let displayExpenses = `
        <p>${expensesResult}</p>
        `
        expensesElement.innerHTML = displayExpenses;
        expensesList.appendChild(expensesElement);
        
    }
    

}




// Takes a transaction as an argument, creates a 'li' and adds it to the 'ul' on the history section
function historyRecords(transaction) {
    const historyElement = document.createElement('li');

    let transactionElement = `
    <div class="transactionElement">
        <p>${transaction.concept}</p>
        <p>${transaction.amount}</p>
    </div>
    `

    historyElement.innerHTML = transactionElement;

    transactionRecords.appendChild(historyElement);
}