import DOMElementCreator from '../utils/DOMElementCreator';

import { API, ASSETS_STORAGE } from '../shared/Constants';

import TAGS from '../shared/Tags.json';

import initStartPage from './StartPage';

import initMainContent from './MainContent';

import renderWords from './RenderWords';

import Result from '../game_result/Result';

import { returnBtnText, newGameText} from './speakconst';


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
const defaultImg = "./assets/images/eng.jpg";
const language = 'en-US';
const span = document.createElement("span");
output.appendChild(span);
const myResult = new Result();
const guessed = [];
let trainMode = true; 


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

async function getWords(group, page) {
  const url = `${API}words?group=${group}&page=${page}`;
  const data = await getData(url);
  // console.log("getWords -> data.map(word => new Word(word))", data.map(word => new Word(word))); 
  return data.map(word => new Word(word));
}
// Events
const words = document.getElementsByClassName('word');

function setDefaultState() {
  guessed.length = 0;
  trainMode = true;
  output.innerHTML = '';
  output.classList.add('none');
  currentImg.setAttribute('src', defaultImg);
  translation.textContent = '';
  [...words].forEach(el => el.remove());
  getWords(0,0).then(res => {
    const arr = res.slice(0, 10).map(item => renderWords(item));
    arr.forEach(el => wordsContainer.append(el));
  })
}

function handleRecognition() {
  [...words].forEach(el => {
    if(el.querySelector('.word-writing').textContent.toLowerCase() === span.innerHTML.toLowerCase()) {
      if (!guessed.includes(el)) {
        el.classList.add('active');
        currentImg.setAttribute('src', el.dataset.myimage);
        guessed.push(el);
  if (guessed.length === 10) {
    // resultBtnHandler(); здесь должно появляться окошко с результатом
  }
      }
    }
  })

  recognition.start();
}

function GetAnswers(item) {
  this.word = item.dataset.wrt;
  this.wordTranslate = item.dataset.transl;
  this.transcription = item.dataset.transcription; 
  this.audio = item.dataset.myaudio.replace(ASSETS_STORAGE, ''); 
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

  resultReturnBtn.addEventListener('click', () => {
    myResult.closeResultWindow();
  });

  resultNewGameBtn.addEventListener('click', () => {
    myResult.closeResultWindow();
    setDefaultState();
    recognition.removeEventListener('end', handleRecognition);
  })
      
  myResult.showResult({
    rightAnswers: guessed.map(item => new GetAnswers(item)),
    wrongAnswers: ([...words].filter((item) => (!guessed.includes(item)))).map(item => new GetAnswers(item)),
    buttons: [resultReturnBtn, resultNewGameBtn],
  });
};
// Events

document.addEventListener('click', event => {
  // render words for game
  if (event.target.classList.contains('start-btn')) {
    startPage.classList.add('none');
    mainWrapper.classList.remove('none');
    getWords(0,0).then(res => {
      const arr = res.slice(0, 10).map(item => renderWords(item));
      arr.forEach(el => wordsContainer.append(el));
    })
  }
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
    const translateText =event.target.parentElement.dataset.transl;
    const wordSrc = event.target.parentElement.dataset.myimage;
    const wordAudio = event.target.parentElement.dataset.myaudio;
    translation.innerText = translateText;
    currentImg.setAttribute('src', wordSrc);
    imgAudio.setAttribute('src', wordAudio);
    imgAudio.play();
    [...words].forEach(el => el.classList.remove('active'));
    event.target.parentElement.classList.add('active'); 
  }
  // restart button
  if (event.target.classList.contains('restart')) {
    setDefaultState();
    recognition.removeEventListener('end', handleRecognition);    
  }  
}) 

// speech recognition on
  const speakBtn = document.querySelector('.speak');
  speakBtn.addEventListener('click', () => {
    trainMode = false;
    output.classList.remove('none');
    [...words].forEach(el => el.classList.remove('active'));
    translation.classList.add('none');
    recognition.start();    
  }); 

  recognition.addEventListener("result", (e) => {
    const last = e.results.length - 1;
    const command = e.results[last][0].transcript;
    span.innerHTML = '';
    span.innerHTML = command; 
  }); 
  
  recognition.addEventListener('end', handleRecognition);
  stopSpeak.addEventListener('click', () => {    
    recognition.removeEventListener('end', handleRecognition);
    output.classList.add('none');
    output.innerHTML = '';
    currentImg.setAttribute('src', defaultImg);
    [...words].forEach(el => el.classList.remove('active'));
    trainMode = true;
    translation.classList.remove('none');
    translation.textContent = '';
  } )  

  const finishBtn = document.querySelector('.finish');
  finishBtn.addEventListener('click', resultBtnHandler);
  
  /* function GetAnswers(item) {
   this.word = item.dataset.wrt;
   this.wordTranslate = item.dataset.transl;
   this.transcription = item.dataset.transcription; 
  } */