
document.addEventListener('DOMContentLoaded', function () {

    //Maintaining the user data in local storage
    let userData = JSON.parse(localStorage.getItem('userData')) || {};
    let loggedInUser = localStorage.getItem('loggedInUser') || null;

    //Getting the form
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const registrationButton = document.getElementById('registrationButton');
    const loginButton = document.getElementById('loginButton');

    // Submitting the form
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            registerUser();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            loginUser();
        });
    }

    if (registrationButton) {
        registrationButton.addEventListener('click', registerUser);
    }

    if (loginButton) {
        loginButton.addEventListener('click', loginUser);
    }


    //Function to register user and password hashing
    function registerUser() {
        const username = document.getElementById('username2').value;
        const password = document.getElementById('password2').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const termsCheckbox = document.getElementById('terms_checkbox');
        const errorMessage = document.getElementById('errorMessage');

        if (userData[username]) {
            displayErrorMessage('Username already taken. Please choose another.');
            return;
        }

        if (password !== confirmPassword) {
            displayErrorMessage('Password and confirm password do not match.');
            return;
        }

        if (!termsCheckbox || !termsCheckbox.checked) {
            displayErrorMessage('Please agree to the terms and conditions.');
            return;
        }

        const hashedPassword = md5(password);

        userData[username] = { password: hashedPassword };
        localStorage.setItem('userData', JSON.stringify(userData));

        loggedInUser = username;
        localStorage.setItem('loggedInUser', loggedInUser);

        displayErrorMessage('');

        alert('Registration successful! Redirecting to login page...');
        window.location.href = '../login.html';
    }


    //Function to login user
    function loginUser() {
        const username1 = document.getElementById('username1').value;
        const password1 = document.getElementById('password1').value;
        const errorMessage = document.getElementById('errorMessage');

        if (!userData[username1]) {
            displayErrorMessage('Username not found. Please check your credentials.');
            return;
        }

        if (md5(password1) === userData[username1].password) {
            loggedInUser = username1;
            localStorage.setItem('loggedInUser', loggedInUser);

            displayErrorMessage('');
            alert('Login successful! Redirecting to home page...');
            window.location.href = '../home.html';
        } else {
            displayErrorMessage('Incorrect password. Please try again.');
        }
    }


    //Error message function 
    function displayErrorMessage(message) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.innerText = message;
        }
    }

});


