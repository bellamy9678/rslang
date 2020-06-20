import { EMAIL_PART } from "./Constants";
import { API, URL_PARAM_SIGN_IN } from "../shared/Constants";

import showWelcomePage from "./WelcomePage";

const signInButton = document.getElementById("sign-in");
const autorizeForm = document.querySelector(".authorization");
let userName;
let userPassword;
let authorizeButton;

function Authorization() {
	this.email = `${userName.value}${EMAIL_PART}`;
	this.password = userPassword.value;
}

async function authorizeUser(obj) {
	let user = obj;
	console.log("authorizeUser -> user", user);
	if (user === undefined) {
		user = new Authorization();
	}
	const rawResponse = await fetch(`${API}${URL_PARAM_SIGN_IN}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	const content = await rawResponse.json();
	console.log(content);
	document.cookie = `userToken=${content.token}`;
	autorizeForm.classList.add("none");
	const name = user.email.replace(`${EMAIL_PART}`, "");

	showWelcomePage(name);
}

signInButton.addEventListener("click", () => {
	autorizeForm.classList.toggle("none");
	userName = document.querySelector(".authorization__username");
	userPassword = document.querySelector(".authorization__password");
	authorizeButton = document.querySelector(".authorization__button");
	authorizeButton.addEventListener("click", (event) => {
		event.preventDefault();
		authorizeUser();
	});
});

export default authorizeUser;
