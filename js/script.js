const registrationForm = document.querySelector('#registrationForm');
const transferMoneyForm = document.querySelector('#transferMoney');
const loginBTN = document.querySelector('.login');
const balanceField = document.querySelector('.balance');
const tdebitsField = document.querySelector('.tdebits');
const tcreditsField = document.querySelector('.tcredits');
const transactionTable = document.querySelector('.transactionTable');

try {
    registrationForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        Bank.addUser();
    })
    
} catch (error) {
    console.error('No registration Form')
}


//Bank
class Bank{
    static userlist=[];


    constructor(bankName = 'GTBank'){
        this.bankName = bankName;
    }

    static addUser(){
        let name = registrationForm.name.value;
        let email = registrationForm.email.value;
        const repeatPassword = registrationForm.repeatPassword.value;
        const password = registrationForm.password.value;

        if (repeatPassword != password) {
            console.error('Password does not match');
            return
        }

        let newUser = new BankUser(name, email, password)
        Bank.userlist.push(newUser);
        let userlist = BankUser.userlist;
        localStorage.setItem('userlist', JSON.stringify(userlist));

        window.location.href = "./login.html";

     }

     static dispayUsers(){
        let userlist = localStorage.getItem('userlist');
        userlist = JSON.parse(userlist);
        console.log(userlist);
     }


    
}

//BankUser
class BankUser extends Bank{
    // #password;

    constructor(name, email, password, balance, bankName){
        super();
       this.password = password;
       this.name = name;
       this.email = email;
       this.accountNumber = BankUser.createAccountNumber();
       this.balance = 0;   
       this.bankName = super.bankName;
     }

     static createAccountNumber(){
        let acctNumber='';
        for (let index = 0; index < 10; index++) {
            let number = Math.floor(Math.random() * 9);
            acctNumber += number;
        }
        return acctNumber;
     }

     static displayUserName(){
        let userlist = localStorage.getItem('userlist');
        userlist = JSON.parse(userlist);
     }
}

//Transaction
class Transaction extends BankUser{
    static transactionList = [];
    constructor(date, amount, sender, recipient){
        super();
        this.date = date;
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
    }

    static addTransaction(transaction){

        Transaction.transactionList.push(transaction);
        let transactionList = Transaction.transactionList;
        localStorage.setItem('transactionList', JSON.stringify(this.transactionList));
    }
    static displayTransactions(){
        let transactionList = localStorage.getItem('transactionList');
        transactionList = JSON.parse(transactionList);

        tbody.innerHTML='';
        transactionList.forEach((transaction, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>${index +1}</td>
                    <td>${transaction.sender}</td>
                    <td>${transaction.recipient}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.date}</td>
                </tr>
            `;
        });

    };
}
let loggedUser;

// Check if user is logged in
window.addEventListener('load', ()=>{
    let userList = localStorage.getItem('userlist');
    userList = JSON.parse(userList);

    try {
        loggedUser = userList.filter((user) =>{
            return user.logged === 'loggedin';
        });
        if (loggedUser) {
            loginBTN.innerHTML = 'log out';
            balanceField.innerHTML = `${loggedUser[0].balance}`;
        }
    
        console.log(loggedUser);
    
    } catch (error) {
        console.error('User list not defined');
    }
});


transferMoneyForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log('user is logged in');  
    let d = new Date();
    let amount = transferMoneyForm.amount.value;
    let recipient = transferMoneyForm.accountNumber.value;
    let newTransaction = new Transaction(`${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`,`${amount}`, `${loggedUser[0].accountNumber}`, `${recipient}`);
    Transaction.addTransaction(newTransaction);
    Transaction.displayTransactions();

    // try {
    //     if (loggedUser) {
    //         console.log('user is logged in');  
    //         let date = new Date();
    //         let amount = transferMoneyForm.amount.value;
    //         let recipient = transferMoneyForm.accountNumber.value;
    //         let newTransaction = new Transaction(`${date.getDay()}`,`${amount}`, `${loggedUser[0].accountNumber}`, `${recipient}`);
    //         Transaction.addTransaction(newTransaction);
    //         Transaction.displayTransactions();
    //       }
    //       else{
    //           console.error('Please log in');
    //           return
    //       }
       
    // } catch (error) {
    //     console.error('log in');
    // }
});