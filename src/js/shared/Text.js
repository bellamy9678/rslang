export const BUTTONS_WORDS = {
	again: 'Снова',
	hard: 'Трудно',
	good: 'Хорошо',
	easy: 'Легко',
	addToDifficult: 'добавить в сложные',
	deleteFromDictionary: 'удалить из изучаемых',
	showAnswer: 'показать ответ'
};

export const AUTHORIZATION_BUTTONS = {
	signIn: 'Sign in',
	signUp: 'Sign up',
	logOut: 'Log out',
};

export const LINKS = {
	settings: 'Settings',
	goToSettings: 'Go to settings',
	statistic: 'Statistic',
	games: 'Games',
	dictionary: 'My Dictionary',
	team: 'Our Team',
	gettingStarted: 'Getting started',
};

export const TEXT = {
	startPage: {
		title: 'Upgrate your english with us!',
		text: 'Dolore ea elit do Lorem aliquip. Do sint laboris Lorem quis incididunt non velit. Aute adipisicing quis et elit.',
	},
	createUserPage: {
		title: 'Create your free account',
		text: 'Do you already have an account? ',
	},
	welcomPage: {
		title: {
			leftPath: 'Hello, ',
			rightPath: '! Let\'s start?'
		}
	},
	settingsPage: {
		title: 'Settings',
		wordsNumberLabel: 'Type the number of words that you will plan to learn in a day',
		cardsNumberLabel: 'Type the number of cards with words for learning in a day',
		cardsInformationText: 'What kind of information should the cards contain?',
		transcriptionLabel: 'Word transcription',
		translationLabel: 'Word translation',
		meaningLabel: 'A sentence which explains the meaning of word',
		meaningTranslateLabel: 'A sentence translate which explains the meaning of word',
		sentenceExempleLabel: 'A sentence with an example of using the studied word',
		sentenceExempleTranslateLabel: 'Translate of the sentence with an example of using the studied word',
		pictureLabel: 'Picture',
		deleteButtonLabel: 'Button to delete a word from the studied words',
		difficultButtonLabel: 'Button to add a word to the difficult words',
		complexityButtonsLabel: '"Again", "Difficult", "Good" and "Easy" buttons',
		showAnswerButtonLabel: 'Button to show the correct answer',
		saveSettingsButton: 'Save',
		useLearnedWordsLabel: 'Use learned words in games',
		errorMessage: 'At least one of three items must be selected (word translation, word meaning or a sentence with an example of using the studied word.',
		successMessage: 'Your settings is saved',
	},
};

export const AUTHORIZATION_FORM = {
	userName: 'Username',
	password: 'Password',
	button: 'Go',
};

export const ERROR_MESSAGES = {
	invalidUsername: 'Username is not valid.',
	invalidPassword: 'The password must contain at least 8 characters, at least one lowercase letter, one uppercase letter, one number and one special character from + -_ @ $!% *? & #.,;: [] {}',
	authorizationErrorMessage: 'Invalid username or password. Please, try again!',
	existingUser: 'User with this name already exists.',
	default: 'Something went wrong.',
};
