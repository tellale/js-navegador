// Requisitos indispensables
// La aplicación deberá mostrar en todo momento el total de gastos, ingresos y el dinero total que tenemos ahorrado.
// Podremos añadir un ingreso o un gasto incluyendo un concepto.
// Podremos borrar cualquier gasto o ingreso que hayamos introducido.
// Requisitos opcionales
// Si cerramos la web y volvemos a entrar, tenemos que recuperar todos los gastos e ingresos que habíamos introducido, así como el ahorro total.

const newTransactionFromElement = document.querySelector('#addNewTransaction')
const incomeList = document.querySelector('#income')
const transactionRecords = document.querySelector('#history-records')
let entryList = []

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
})

// get amount added
// if positive sum with current income
// if negative sum it with current expenses


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