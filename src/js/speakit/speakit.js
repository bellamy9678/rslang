import DOMElementCreator from '../utils/DOMElementCreator';

import { API, ASSETS_STORAGE } from '../shared/Constants';

import TAGS from '../shared/Tags.json';

import initStartPage from './StartPage';

import initMainContent from './MainContent';

import renderWords from './RenderWords';

import Result from '../game_result/Result';

import { returnBtnText, newGameText, statisticText, emptyString } from './speakconst';


// Creat DOM
const app = document.querySelector('.app');
const newElem = new DOMElementCreator();

const wrapper = newElem.create({
	elem: TAGS.DIV,
	classes: ['wrapper', 'speakit__wrapper'],
	child: [initStartPage(), initMainContent()],
});

app.append(wrapper);

const mainWrapper = document.querySelector('.main-container');
const currentImg = document.querySelector('.current-image');
const translation = document.querySelector('.current-transl');
const wordsContainer = document.querySelector('.words-container');
const imgAudio = document.querySelector('.pronounce');
const output = document.querySelector('.word-output');
const stopSpeak = document.querySelector('.stop-speak');
const startPage = document.querySelector('.start-page');
const startBtn = document.querySelector('.start-btn');
const words = document.getElementsByClassName('word');
const defaultImg = './assets/images/eng.jpg';
const language = 'en-US';
const span = document.createElement('span');
output.appendChild(span);
const myResult = new Result();
const guessed = [];
let trainMode = true;
const zero = 0;
const guessedAll = 10;


async function getData(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

// Эта функция Лизы, мне нужно импорт из какого-то ее файла добавить
function Word(word) {
	this.id = word.id;
	this.word = word.word;
	this.translate = word.wordTranslate;
	this.transcription = word.transcription;
	this.audio = `${ASSETS_STORAGE}${word.audio}`;
	this.image = `${ASSETS_STORAGE}${word.image}`;
	this.example = word.textExample;
	this.exampleTranslate = word.textExampleTranslate;
	this.exampleAudio = `${ASSETS_STORAGE}${word.audioExample}`;
}


// Speech recognition
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = language;

// words
async function getWords(group, page) {
	const url = `${API}words?group=${group}&page=${page}`;
	const data = await getData(url);
	return data.map(word => new Word(word));
}

// Events

function setDefaultState() {
	const level = document.getElementById('level').value;
	const round = document.getElementById('round').value;
	guessed.length = zero;
	trainMode = true;
	span.textContent = emptyString;
	output.classList.add('none');
	currentImg.setAttribute('src', defaultImg);
	translation.textContent = emptyString;
	[...words].forEach(el => el.remove());
	getWords(level, round).then(res => {
		const arr = res.slice(zero, guessedAll).map(item => renderWords(item));
		arr.forEach(el => wordsContainer.append(el));
	});
}

function setStartingState() {
	guessed.length = zero;
	trainMode = true;
	span.textContent = emptyString;
	output.classList.add('none');
	currentImg.setAttribute('src', defaultImg);
	translation.textContent = emptyString;
	[...words].forEach(el => el.remove());
}

function GetAnswers(item) {
	this.word = item.dataset.wrt;
	this.wordTranslate = item.dataset.transl;
	this.transcription = item.dataset.transcription;
	this.audio = item.dataset.myaudio.replace(ASSETS_STORAGE, emptyString);
}

function clickHandler(event) {
	// sound on word click
	if (event.target.classList.contains('word') && trainMode) {
		const translateText = event.target.dataset.transl;
		const wordSrc = event.target.dataset.myimage;
		const wordAudio = event.target.dataset.myaudio;
		translation.innerText = translateText;
		currentImg.setAttribute('src', wordSrc);
		imgAudio.setAttribute('src', wordAudio);
		imgAudio.play();
		[...words].forEach(el => el.classList.remove('active'));
		event.target.classList.add('active');
	}
	// sound on word click
	if (event.target.parentElement.classList.contains('word') && trainMode) {
		const translateText = event.target.parentElement.dataset.transl;
		const wordSrc = event.target.parentElement.dataset.myimage;
		const wordAudio = event.target.parentElement.dataset.myaudio;
		translation.innerText = translateText;
		currentImg.setAttribute('src', wordSrc);
		imgAudio.setAttribute('src', wordAudio);
		imgAudio.play();
		[...words].forEach(el => el.classList.remove('active'));
		event.target.parentElement.classList.add('active');
	}
}

// Modal window 
function resultBtnHandler() {
	const resultReturnBtn = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['result__button', 'result__continue-btn'],
		child: returnBtnText,
	});

	const resultNewGameBtn = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['result__button', 'result__continue-btn'],
		child: newGameText,
	});

	const statisticBtn = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['result__button', 'result__continue-btn'],
		child: statisticText,
	});

	statisticBtn.addEventListener('click', () => {
		myResult.closeResultWindow();
		document.removeEventListener('click', clickHandler);
		// дописать метод, показывающий статистику по игре
	});

	resultReturnBtn.addEventListener('click', () => {
		myResult.closeResultWindow();
	});

	resultNewGameBtn.addEventListener('click', () => {
		myResult.closeResultWindow();
		setStartingState();
		recognition.stop();
		mainWrapper.classList.add('none');
		startPage.classList.remove('none');
		document.removeEventListener('click', clickHandler);
	});

	myResult.showResult({
		rightAnswers: guessed.map(item => new GetAnswers(item)),
		wrongAnswers: ([...words].filter((item) => (!guessed.includes(item)))).map(item => new GetAnswers(item)),
		buttons: [resultReturnBtn, resultNewGameBtn, statisticBtn],
	});
};

function handleRecognition() {
	[...words].forEach(el => {
		if (el.querySelector('.word-writing').textContent.toLowerCase() === span.textContent.toLowerCase()) {
			if (!guessed.includes(el)) {
				el.classList.add('active');
				currentImg.setAttribute('src', el.dataset.myimage);
				guessed.push(el);
				if (guessed.length === guessedAll) {
					resultBtnHandler();
				}
			}
		}
	});

	recognition.start();
}

// event on start btn ckick
startBtn.addEventListener('click', event => {
	if (event.target.classList.contains('start-btn')) {
		startPage.classList.add('none');
		mainWrapper.classList.remove('none');
		recognition.removeEventListener('end', handleRecognition);
		const level = document.getElementById('level').value;
		const round = document.getElementById('round').value;
		getWords(level, round).then(res => {
			const arr = res.slice(zero, guessedAll).map(item => renderWords(item));
			arr.forEach(el => wordsContainer.append(el));
		});
		document.addEventListener('click', clickHandler);
	}
});

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', () => {
	setDefaultState();
	recognition.stop();
	recognition.removeEventListener('end', handleRecognition);

});

// speech recognition on
const speakBtn = document.querySelector('.speak');
speakBtn.addEventListener('click', () => {
	trainMode = false;
	output.classList.remove('none');
	[...words].forEach(el => el.classList.remove('active'));
	translation.classList.add('none');
	recognition.start();
	recognition.addEventListener('end', handleRecognition);
});

recognition.addEventListener('result', (e) => {
	const last = e.results.length - 1;
	const command = e.results[last][zero].transcript;
	span.textContent = emptyString;
	span.textContent = command;
});

// speech recognition off
stopSpeak.addEventListener('click', () => {
	recognition.stop();
	recognition.removeEventListener('end', handleRecognition);
	output.classList.add('none');
	span.textContent = emptyString;
	currentImg.setAttribute('src', defaultImg);
	[...words].forEach(el => el.classList.remove('active'));
	trainMode = true;
	translation.classList.remove('none');
	translation.textContent = emptyString;
});

const finishBtn = document.querySelector('.finish');
finishBtn.addEventListener('click', resultBtnHandler);  