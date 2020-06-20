import { EMAIL_PART, PASSWORD_REG_EXP } from './Constants';
import { API, URL_PARAM_USER } from '../shared/Constants';
import TAGS from '../shared/Tags.json';
import authorizeUser from './Authorization';
import DOMElementCreator from '../utils/DOMElementCreator';

const signUpButton = document.getElementById('sign-up');
let emailInput;
let passwordInput;
let createAccountButton;

function User() {
	this.email = `${emailInput.value}${EMAIL_PART}`;
	this.password = passwordInput.value;
}

function checkPassword(password) {
	return PASSWORD_REG_EXP.test(password);
}

async function createUser(event) {
	if (checkPassword(passwordInput.value)) {
		event.preventDefault();
		const user = new User();
		console.log('createUser -> user', user);
		const rawResponse = await fetch(`${API}${URL_PARAM_USER}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
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
	const newElem = new DOMElementCreator();

	const title = newElem.create({
		elem: TAGS.H2,
		classes: 'account-creation__title',
		child: ['Create your free account'],
	});

	const signInLink = newElem.create({
		elem: TAGS.A,
		classes: 'account-creation__link',
		attr: [
			{
				href: '#',
			},
		],
		child: ['Sing in'],
	});

	const text = newElem.create({
		elem: TAGS.P,
		classes: 'account-creation__text',
		child: ['Do you already have an account? ', signInLink],
	});

	const userNameLabel = newElem.create({
		elem: TAGS.LABEL,
		attr: [
			{
				for: 'new-user__name',
			},
		],
		child: ['Username'],
	});

	const userNameInput = newElem.create({
		elem: TAGS.INPUT,
		classes: 'account-creation__username',
		id: 'new-user__name',
		attr: [
			{
				type: 'text',
			},
			{
				required: 'required',
			},
		],
	});

	const userPasswordLabel = newElem.create({
		elem: TAGS.LABEL,
		attr: [
			{
				for: 'new-user__password',
			},
		],
		child: ['Password'],
	});

	const userPasswordInput = newElem.create({
		elem: TAGS.INPUT,
		classes: 'account-creation__password',
		id: 'new-user__password',
		attr: [
			{
				// for testing
				type: 'text',
			},
			{
				required: 'required',
			},
		],
	});

	const button = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['button', 'button_colored', 'account-creation__button'],
		child: ['Sign Up'],
	});

	const form = newElem.create({
		elem: TAGS.FORM,
		classes: 'account-creation__form',
		child: [
			title,
			text,
			userNameLabel,
			userNameInput,
			userPasswordLabel,
			userPasswordInput,
			button,
		],
	});

	const background = newElem.create({
		elem: TAGS.DIV,
		classes: 'account-creation__background',
		child: [form],
	});

	const page = newElem.create({
		elem: TAGS.DIV,
		classes: 'account-creation',
		child: [background],
	});

	app.innerHTML = '';
	app.append(page);
	emailInput = document.getElementById('new-user__name');
	passwordInput = document.getElementById('new-user__password');
	createAccountButton = document.querySelector('.account-creation__button');
	createAccountButton.addEventListener('click', createUser);
}

signUpButton.addEventListener('click', showCreateAccountPage);
