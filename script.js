const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const btn = document.getElementById("btn");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

// Update the UI

function updateUI() {
    list.innerHTML = "";

    let total = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((item, index) => {
        const li = document.createElement("li");

        const description = document.createElement("span");
        description.textContent = item.text;

        const amountDisplay = document.createElement("span");
        amountDisplay.textContent =
            (item.amount < 0 ? "-$" : "$") +
            Math.abs(item.amount).toFixed(2);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "X";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            deleteTransaction(index);
        });

        li.append(description, amountDisplay, deleteButton);
        list.appendChild(li);

        total += item.amount;

        if (item.amount > 0) {
            incomeTotal += item.amount;
        } else {
            expenseTotal += item.amount;
        }
    });

    balance.textContent = "$" + total.toFixed(2);
    income.textContent = "$" + incomeTotal.toFixed(2);
    expense.textContent = "$" + Math.abs(expenseTotal).toFixed(2);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// Add a transaction

btn.addEventListener("click", () => {
    const description = text.value.trim();
    const transactionAmount = Number(amount.value);

    if (description === "") {
        alert("Please enter a transaction description.");
        text.focus();
        return;
    }

    if (
        amount.value.trim() === "" ||
        !Number.isFinite(transactionAmount) ||
        transactionAmount === 0
    ) {
        alert("Please enter a valid amount other than zero.");
        amount.focus();
        return;
    }

    transactions.push({
        text: description,
        amount: transactionAmount
    });

    text.value = "";
    amount.value = "";

    updateUI();
});

// Delete a transaction

function deleteTransaction(index) {
    if (index < 0 || index >= transactions.length) {
        return;
    }

    transactions.splice(index, 1);
    updateUI();
}

// Display saved transactions on page load

updateUI();
