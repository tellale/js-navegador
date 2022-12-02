// Requisitos indispensables
// La aplicación deberá mostrar en todo momento el total de gastos, ingresos y el dinero total que tenemos ahorrado.
// Podremos añadir un ingreso o un gasto incluyendo un concepto.
// Podremos borrar cualquier gasto o ingreso que hayamos introducido.
// Requisitos opcionales
// Si cerramos la web y volvemos a entrar, tenemos que recuperar todos los gastos e ingresos que habíamos introducido, así como el ahorro total.


// Add new transaction
// DONE create event on click
// save in localstorage concept and amount
// delete from screen

const newTransactionFromElement = document.querySelector('#addNewTransaction')
const incomeList = document.querySelector('#income')

newTransactionFromElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const conceptElement = document.querySelector('#concept');
    const amountElement = document.querySelector('#amount');

    let transaction = {
        concept: conceptElement.value,
        amount: amountElement.value,
    }

    sumIncomeExpenses(transaction.amount)
    console.log(transaction)

    localStorage.setItem('newTransaction', transaction);
    

    conceptElement.value = '';
    amountElement.value = '';
})

// get amount added
// if positive sum with current income
// if negative sum it with current expenses

function sumIncomeExpenses(amount){


    if (amount > 0) {
    } else {
        totalExpenses += amount
    }
}