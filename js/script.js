const registrationForm = document.querySelector('#registrationForm');

registrationForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    Bank.addUser();
})


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
}


