


class BankUser{
    #password;
    static userlist=[];

    constructor(name, email, phoneNumber, password){
       this.#password = password;
       this.name = name; 
       this.email = email;
       this.phoneNumber = phoneNumber;
    }

     static dispayUsers(){
        console.log(BankUser.userlist);
     }
     static addUser(user){
        BankUser.userlist.push(user);
     }
}

class Transactions{
    constructor(date, amount, sender, reciever){

    }
}

