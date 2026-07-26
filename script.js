const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const btn = document.getElementById("btn");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI(){

    list.innerHTML="";

    let total = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((item,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
        ${item.text}
        <span>$${item.amount}</span>
        <button class="delete" onclick="deleteTransaction(${index})">X</button>
        `;

        list.appendChild(li);

        total += item.amount;

        if(item.amount>0)
            incomeTotal += item.amount;
        else
            expenseTotal += item.amount;
    });

    balance.innerText="$"+total.toFixed(2);
    income.innerText="$"+incomeTotal.toFixed(2);
    expense.innerText="$"+Math.abs(expenseTotal).toFixed(2);

    localStorage.setItem("transactions",
    JSON.stringify(transactions));
}

btn.addEventListener("click",()=>{

    if(text.value=="" || amount.value==""){
        alert("Please fill all fields");
        return;
    }

    transactions.push({
        text:text.value,
        amount:Number(amount.value)
    });

    text.value="";
    amount.value="";

    updateUI();
});

function deleteTransaction(index){

    transactions.splice(index,1);

    updateUI();
}

updateUI();