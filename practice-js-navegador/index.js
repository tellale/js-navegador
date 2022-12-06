// Needed variables
const newTransactionFromElement = document.querySelector('#addNewTransaction')
const savingsList = document.querySelector('#savings-box')
const incomeList = document.querySelector('#income-box')
const expensesList = document.querySelector('#expenses-box')
const transactionRecords = document.querySelector('#history-records')
let entryList = []
let incomeResult 
let expensesResult
let savingsResult
let currentSavedIncome
let currentSavedExpenses
let currentSavedSavings

// Initializing app
setUpScreenNumbers()
setUpHistory()

// Main addTransaction button event
newTransactionFromElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const conceptElement = document.querySelector('#concept');
    const amountElement = document.querySelector('#amount');
    const max = 1000

    let transaction = {
        concept: conceptElement.value,
        amount: parseFloat(amountElement.value),
        id: Math.floor(Math.random() * max),
    }
    entryList.push(transaction)

    localStorage.setItem('storageTransactionHistory', JSON.stringify(entryList));

    conceptElement.value = '';
    amountElement.value = '';

    historyRecords(transaction);
    sumIncomeExpenses(transaction.amount);
})


// Set up screen with info from localStorage
function setUpScreenNumbers(){
    currentSavedIncome = JSON.parse(localStorage.getItem('storageIncome'));
    drawIncome(currentSavedIncome)

    currentSavedExpenses = JSON.parse(localStorage.getItem('storageExpenses'));
    drawExpenses(currentSavedExpenses)

    currentSavedSavings = JSON.parse(localStorage.getItem('storageSavings'));
    drawSavings(currentSavedSavings)
}

function setUpHistory() {
    let transactionSavedHistory = JSON.parse(localStorage.getItem('storageTransactionHistory'));
    console.log(transactionSavedHistory)

    if (transactionSavedHistory !== null) {
        for (let i = 0; i < transactionSavedHistory.length; i++) {
            historyRecords(transactionSavedHistory[i]);
            entryList.push(transactionSavedHistory[i])
        }
    }
    
}

function localStorageManagement(income, expenses, savings) {
    // Income localStorage
    let storageIncome = income
    localStorage.setItem('storageIncome', JSON.stringify(storageIncome))

    // Expenses localStorage
    let storageExpenses = expenses
    localStorage.setItem('storageExpenses', JSON.stringify(storageExpenses))
    
    // Savings localStorage
    let storageSavings = savings
    localStorage.setItem('storageSavings', JSON.stringify(storageSavings))

}

// takes a transaction. If amount is + will add to currentIncome and display under Income box. If - will add to current Expenses and display under Expenses box.
function sumIncomeExpenses(amount) {
    
    if (amount > 0) {
        incomeResult = currentSavedIncome + parseFloat(amount)
        currentSavedIncome = incomeResult
        drawIncome(currentSavedIncome)

        savingsResult = currentSavedSavings + parseFloat(amount)
        currentSavedSavings = savingsResult
    } else {
        expensesResult = currentSavedExpenses + (-parseFloat(amount))
        currentSavedExpenses = expensesResult
        drawExpenses(currentSavedExpenses)

        savingsResult = currentSavedSavings + parseFloat(amount)
        currentSavedSavings = savingsResult
    }

    localStorageManagement(currentSavedIncome, currentSavedExpenses, currentSavedSavings)
    drawSavings(currentSavedSavings)

}

// Drawing functions
function drawSavings(savings) {
    const savingsElement = document.querySelector('#savingsElement')
    let displaySavings

    if (savings !== null) {
        if (savings >= 0) {
            displaySavings = `
            <p class="displaySavingsGreen">${savings}€</p>
            `
        } else {
            displaySavings = `
            <p class="displaySavingsRed">${savings}€</p>
            `
        }  
    } else {
        displaySavings = `
        <p class="displaySavingsGreen">0.00€</p>
        `
    }
    savingsElement.innerHTML = displaySavings;
    savingsList.appendChild(savingsElement);
}

function drawIncome(income) {
    const incomeElement = document.querySelector('#incomeElement')
    let displayIncome

    if (income !== null) {
        displayIncome = `
        <p>${income}€</p>
        `
    } else {
        displayIncome = `
        <p>0.00€</p>
        ` 
    }
    incomeElement.innerHTML = displayIncome;
    incomeList.appendChild(incomeElement);

}

function drawExpenses(expenses) {
    const expensesElement = document.querySelector('#expensesElement')
    let displayExpenses 
    
    if (expenses !== null) {
        displayExpenses = `
        <p>${expenses}€</p>
        `
    } else {
        displayExpenses = `
        <p>0.00€</p>
        `
    }
    expensesElement.innerHTML = displayExpenses;
    expensesList.appendChild(expensesElement);
}

// Takes a transaction as an argument, creates a 'li' and adds it to the 'ul' on the history section
function historyRecords(transaction) {
    const historyElement = document.createElement('li');

    historyElement.setAttribute('id', transaction.id)

    let transactionElement
    if (transaction.amount > 0){
        transactionElement = `
        <div class="transactionElementGreen">
            <p class="transactionConcept">${transaction.concept}</p>
            <p class="transactionAmountGreen">${transaction.amount}€</p>
            <button class='delete-button' onclick = 'deleteTransactionFromHistory(${transaction.id}, ${transaction.amount})'><img class='delete-icon' src='./delete.png' /></button>
        </div> `
    } else {
        transactionElement = `
        <div class="transactionElementRed">
            <p class="transactionConcept">${transaction.concept}</p>
            <p class="transactionAmountRed">${transaction.amount}€</p>
            <button class='delete-button' onclick = 'deleteTransactionFromHistory(${transaction.id}, ${transaction.amount})'><img class='delete-icon' src='./delete.png' /></button>
        </div> `
    }
    

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
        deleteTransactionFromIncomeExpensesSavings(amount);
        deleteFromStorage(id);
    }
}

// Deletes entries from localStorage
function deleteFromStorage(id) {
    for (let i = 0; i < entryList.length; i++) {
        if(entryList[i].id == id) {
            entryList.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('storageTransactionHistory', JSON.stringify(entryList));
}

// Deletes transacion amount from income, expenses or savings when transaction history is ereased. 
function deleteTransactionFromIncomeExpensesSavings(amount) {
    
    if (amount > 0) {
        let incomeResult = currentSavedIncome - amount
        currentSavedIncome = incomeResult

        drawIncome(incomeResult)

    } else {
        let expensesResult = currentSavedExpenses - (-amount)
        currentSavedExpenses = expensesResult

        drawExpenses(expensesResult)
    }

    let savingsResult = currentSavedSavings - amount
    currentSavedSavings = savingsResult

    drawSavings(savingsResult)
    localStorageManagement(currentSavedIncome, currentSavedExpenses, currentSavedSavings)
}