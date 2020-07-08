import { API, ASSETS_STORAGE } from '../shared/Constants';

import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

import renderWords from './RenderWords';

import renderTranslate from './RenderTranslate';

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

async function getWords(group, page) {
	const url = `${API}words?group=${group}&page=${page}`;
	const data = await getData(url);
	// console.log("getWords -> data.map(word => new Word(word))", data.map(word => new Word(word))); 
	return data.map(word => new Word(word));
}

// getWords(0,0).then(res => console.log(res.slice(0,10)));

// create dom

const app = document.querySelector('.app');
const newElem = new DOMElementCreator();

const score = newElem.create({
	elem: TAGS.DIV,
	classes: ['game-score'],
});

const engWordsContainer = newElem.create({
	elem: TAGS.DIV,
	classes: ['english-container'],
});

const translationContainer = newElem.create({
	elem: TAGS.DIV,
	classes: ['translation-container'],
});

const gameContainer = newElem.create({
	elem: TAGS.DIV,
	classes: ['game-container'],
	child: [score, engWordsContainer, translationContainer],
});

const wrapper = newElem.create({
	elem: TAGS.DIV,
	classes: ['wrapper', 'ourgame__wrapper'],  
	child: [gameContainer],
});

// перемешать массивы
function shuffle(words) {
	const array = words;
	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
} 



app.append(wrapper);

// getWords(0,0).then(res => console.log(res.slice(0,10)));

getWords(0,0).then(res => {
	let words = res.slice(0, 15).map(item => renderWords(item));
	words = shuffle(words);
	words.forEach(el => engWordsContainer.append(el));

	let translations =res.slice(0, 15).map(item => renderTranslate(item));
	translations = shuffle(translations);
	translations.forEach(el => translationContainer.append(el));
});

const engWords = document.getElementsByClassName('word');
const translation = document.getElementsByClassName('word-translation');

function compareWords() {
	const word = document.querySelector('.chosen');
	const transl = document.querySelector('.active');
	if (word !== null && transl !== null) {
		if( word.textContent === transl.dataset.word) {
			transl.remove();
			word.remove();
		} else {
			word.classList.add('yellow');
			word.classList.remove('chosen');
			transl.classList.remove('active');
		}
	}
}


document.addEventListener('click', event => {
	if (event.target.classList.contains('word')) {
		[...engWords].forEach( el => {
			el.classList.remove('chosen');
			event.target.classList.add('chosen');
			compareWords();
		});
	}

	if (event.target.classList.contains('word-translation')) {
		[...translation].forEach( el => {
			el.classList.remove('active');
			event.target.classList.add('active');
			compareWords();
		});
	}
	
});