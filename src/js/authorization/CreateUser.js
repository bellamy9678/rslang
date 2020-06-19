import {
    API,
    USER_METHOD
} from './Constants';
import authorizeUser from './Authorization';

const signUpButton = document.getElementById('sign-up');
let emailInput;
let passwordInput;
let createAccountButton;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;

function User() {
    this.email = `${emailInput.value}@rslang.com`;
    this.password = passwordInput.value;
}

function checkPassword(password) {
    return passwordRegExp.test(password);
}

async function createUser(event) {
    if (checkPassword(passwordInput.value)) {
        event.preventDefault();
        const user = new User();
        console.log("createUser -> user", user);
        const rawResponse = await fetch(`${API}${USER_METHOD}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        const content = await rawResponse.json();
        console.log(content);
        authorizeUser(user);
    } else {
        console.log('Password is not valid');
    }
}

function showCreateAccountPage() {
    const app = document.querySelector('.app');
    const createAccountPage = document.createElement('div');

    createAccountPage.className = 'account-creation';
    createAccountPage.innerHTML = `<div class="account-creation__overlay">
    <form class="account-creation__form">
        <h2 class="account-creation__title">Create your free account</h2>
        <p class="account-creation__text">Do you already have an account? <a class="account-creation__link"
                href="#">Sing in</a>
        </p>
        <label for="new-user__name">Username</label>
        <input class="account-creation__username" id="new-user__name" type="text" required>
        <label for="new-user__password">Password</label>
        <input class="account-creation__password" id="new-user__password" type="text" required>
        <button class="button button_colored account-creation__button">Sign Up</button>
    </form>
    </div>`;

    app.innerHTML = '';
    app.append(createAccountPage);
    emailInput = document.getElementById('new-user__name');
    passwordInput = document.getElementById('new-user__password');
    createAccountButton = document.querySelector('.account-creation__button');
    createAccountButton.addEventListener('click', createUser);
}

signUpButton.addEventListener('click', showCreateAccountPage);