const loginForm= document.querySelector('#loginForm');


loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    login();
    // window,location.href = '../userpage.html';
});

function doesUserExist(){
    let userName = loginForm.email.value;
    let userList = localStorage.getItem('userlist');
    userList = JSON.parse(userList);

    userList = userList.filter((user) => {return user.email === userName})

    if (userList.length > 0) {
        console.log('User found');
        return true;
    }
    console.error('User not found');
    return false;
}

function login() {
    let does = doesUserExist();
    if (does) {
        let inputEmail = loginForm.email.value;
        let inputPassword = loginForm.password.value;
        let userList = localStorage.getItem('userlist');
        userList = JSON.parse(userList);    
        let user = userList.filter((user) => {return user.email === inputEmail})
        if (inputPassword === user[0].password) {
            console.log('You are logged in');
            window.location.href = '/userpage.html';
            userList.map(user => {
                if (user.email === inputEmail) {
                    user.logged = 'loggedin';
                }
            })
            localStorage.setItem('userlist', JSON.stringify(userList));
            console.log(userList);
            return            
        }
        console.error('Enter valid password');
    }
    console.error('Enter a valid email address');
}
