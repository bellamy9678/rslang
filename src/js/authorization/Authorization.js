import {
    API,
    SIGN_IN_METHOD
} from './Constants';

import showWelcomePage from './WelcomePage';

const signInButton = document.getElementById('sign-in');
const autorizeForm = document.querySelector('.authorization');
let userName;
let userPassword;
let authorizeButton;

function Authorization() {
    this.email = `${userName.value}@rslang.com`;
    this.password = userPassword.value;
}

async function authorizeUser(obj) {
    let user = obj;
    console.log("authorizeUser -> user", user)
    if (user === undefined) {
        user = new Authorization();
    }
    const rawResponse = await fetch(`${API}${SIGN_IN_METHOD}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const content = await rawResponse.json();
    console.log(content);
    document.cookie = `userToken=${content.token}`;
    autorizeForm.classList.add('none');
    const name = user.email.replace('@rslang.com', '');

    showWelcomePage(name);
}

signInButton.addEventListener('click', () => {
    autorizeForm.classList.toggle('none');
    userName = document.querySelector('.authorization__username');
    userPassword = document.querySelector('.authorization__password');
    authorizeButton = document.querySelector('.authorization__button');
    authorizeButton.addEventListener('click', event => {
        event.preventDefault();
        authorizeUser();
    });
});

export default authorizeUser;