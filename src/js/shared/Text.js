export const BUTTONS_WORDS = {
	again: 'Снова',
	hard: 'Трудно',
	good: 'Хорошо',
	easy: 'Легко',
	addToDifficult: 'добавить в сложные',
	deleteFromDictionary: 'удалить из изучаемых',
	showAnswer: 'показать ответ',
	continue: 'дальше'
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
	welcomePage: {
		title: {
			leftPath: 'Hello, ',
			rightPath: '! Let\'s start?'
		},
		trainingModeButton: 'Start training',
	},

	gamesPage: {
		title: 'Try our amazing games!',
		description: 'Lorem ipsum dolore si amet.',
	},

	settingsPage: {
		title: 'Settings',
		wordsNumberLabel: 'Type the number of words that you will plan to learn in a day',
		cardsNumberLabel: 'Type the number of cards with words for learning in a day',
		cardsInformationText: 'What kind of information should the cards contain?',
		transcriptionLabel: 'Word transcription',
		translationLabel: 'Word translation',
		meaningLabel: 'A sentence which explains the meaning of word',
		meaningAudioLabel: 'Add a button to listen to sentences with the meaning of the word',
		meaningTranslateLabel: 'A sentence translate which explains the meaning of word',
		sentenceExempleLabel: 'A sentence with an example of using the studied word',
		sentenceExampleAudioLabel: 'Add a button to listen to sentences with the example of the word',
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

	aboutUsPage : {
		title : 'Our Team',
		description : 'We worked hard to provide reliable RSLang. That allow you to focus solely on your learning with peace of mind – knowing that our agile and unrivalled team are on hand 24/7, should they ever have any issues with our cutting-edge product.',
		mentorHeader : 'And... Our curator',
		mentorDescription : 'It would not have been possible without our mentor.',

		command : [
			{
				name : 'Mikhail Fursa',
				git : 'bellamy9678',
				text : 'Team lead, app architecture, settings, statistics, words, training mode, utils, some design and modules integration.'
			},
			{
				name : 'Lizaveta Kunitskaya',
				git : 'Chaba-chaba',
				text : 'Authorization, dictionary, main page, UI-UX design, styles and modules integration.'
			},
			{
				name : 'Aleksandra Ivanova',
				git : 'leqsar',
				text : 'Games: Audio Challange and Savannah.'
			},
			{
				name : 'Andrii Konovalov',
				git : 'Garza0',
				text : 'Games: English puzzle and Sprint; also start game screen and game result window.'
			},
			{
				name : 'Tatsiana Alsheuskaya',
				git : 'Ttttanna',
				text : 'Games: Speak it and Our game.'
			},
		],

		mentor : {
			name : 'Denis Kravchenko',
			git : 'DKravchenkoEpam',
			text : 'Organize command work, helpful and highly relevant advices and recommendation for any part of application or work.'
		}
	}
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

export const GAME_NAMES = {
	englishPuzzle: 'English Puzzle',
	speakIt: 'Speak It',
	savannah: 'Savannah',
	audioChallenge: 'Audio Challenge',
	sprint: 'Sprint',
	ownGame: 'Super duper game',
};

export const CATEGORY_NAMES = {
	ACTIVE: 'Studied words',
	DIFFICULT: 'Difficult words',
	REMOVED: 'Removed words',
};

export const DICTIONARY_BUTTONS = {
	RECOVER: 'Recover word'
};
