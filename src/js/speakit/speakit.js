import DOMElementCreator from '../utils/DOMElementCreator';

import { API, ASSETS_STORAGE } from '../shared/Constants';

import TAGS from '../shared/Tags.json';


// Creat DOM
const app = document.querySelector('.app');
const newElem = new DOMElementCreator();

// start page
const gameName = newElem.create({
  elem: TAGS.H1,
  classes: 'game-name',
  child: ['Speak it']
});

const startP1 = newElem.create({
  elem: TAGS.P,
  classes: 'description_p',
  child: ['Click on the world to hear them sound'],
});

const startP2 = newElem.create({
  elem: TAGS.P,
  classes: 'description_p',
  child: ['Click on the button and speak the words into the microphone'],
});

const gameDescription = newElem.create({
  elem: TAGS.DIV,
  classes: 'description',  
  child: [startP1, startP2],
});

const gameButton = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'start-btn',  
  child: ['Start Game'],
});

const startPage = newElem.create({
  elem: TAGS.DIV,
  classes: 'start-page',  
  child: [gameName, gameDescription, gameButton],
});


// main-content

const levelBtn1 = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'level-btn',  
  child: ['1'],
});
const levelBtn2 = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'level-btn',  
  child: ['2'],
});
const levelBtn3 = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'level-btn',  
  child: ['3'],
});
const levelBtn4 = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'level-btn',  
  child: ['4'],
});
const levelBtn5 = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'level-btn',  
  child: ['5'],
});
const levelBtn6 = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'level-btn',  
  child: ['6'],
});

const level = newElem.create({
  elem: TAGS.DIV,
  classes: 'level',  
  child: [levelBtn1, levelBtn2, levelBtn3, levelBtn4, levelBtn5, levelBtn6],
});
const currentImg = newElem.create({
  elem: TAGS.IMG,
  classes: 'current-image',
  attr: [{
    src: './assets/images/eng.jpg'
  }, {
    alt: 'Image'
  }],
});

const translation = newElem.create({
  elem: TAGS.P,
  classes: 'current-transl',  
});

const output = newElem.create({
  elem: TAGS.P,
  classes: ['word-output', 'invisible'],
});

const imgCont =newElem.create({
  elem: TAGS.DIV,
  classes: 'image-container',  
  child: [currentImg, translation, output],
});

const wordsContainer = newElem.create({
  elem: TAGS.DIV,
  classes: 'words-container',
});

const audioSrc = newElem.create({
  elem: TAGS.SOURCE,
  attr: {
    src: '',
  } 
});

const imgAudio = newElem.create({
  elem: TAGS.AUDIO,
  classes: 'pronounce',  
  child: [audioSrc],
});

const restButton = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'restart',  
  child: ['Restart'],
});

const speakButton = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'speak',  
  child: ['Speak, please'],
});

const  stopSpeak = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'stop-speak',  
  child: ['Stop speak'],
});

const finishButton = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'finish',  
  child: ['Finish'],
});

const btnContainer = newElem.create({
  elem: TAGS.DIV,
  classes: 'buttons-container',  
  child: [restButton, speakButton,  stopSpeak, finishButton],
});

const mainWrapper = newElem.create({
  elem: TAGS.DIV,
  classes: ['main-container', 'invisible'],  
  child: [level, imgCont, wordsContainer, imgAudio, btnContainer],
});

// results
const errNum = newElem.create({
  elem: TAGS.SPAN,
  classes: 'errors-num',
});

const succesNum = newElem.create({
  elem: TAGS.SPAN,
  classes: 'succes-num',
});

const errorP = newElem.create({
  elem: TAGS.P,
  classes: 'errors',  
  child: ['Ошибок', errNum],
});

const successP = newElem.create({
  elem: TAGS.P,
  classes: 'succes',  
  child: ['Знаю', succesNum],
});

const errorsItems = newElem.create({
  elem: TAGS.DIV,
  classes: 'errors-items',
});

const succesItems = newElem.create({
  elem: TAGS.DIV,
  classes: 'succes-items',
});

const returnBtn = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'return-btn',  
  child: ['Return'],
});

const NewBtn = newElem.create({
  elem: TAGS.BUTTON,
  classes: 'new-btn',  
  child: ['New Game'],
});

const resultBtnContainer = newElem.create({
  elem: TAGS.DIV,
  classes: 'result-btn',  
  child: [returnBtn, NewBtn],
});

const resultCont = newElem.create({
  elem: TAGS.DIV,
  classes: 'result-container',  
  child: [errorP, errorsItems, successP, succesItems, resultBtnContainer],
});

const resultContainer = newElem.create({
  elem: TAGS.DIV,
  classes: ['result', 'invisible'],  
  child: [resultCont],
});

const wrapper = newElem.create({
  elem: TAGS.DIV,
  classes: ['wrapper', 'speakit__wrapper'],  
  child: [startPage, mainWrapper, resultContainer],
});

app.append(wrapper);



async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


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

const defaultImg = "./assets/images/eng.jpg";
// Speech recognition
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const span = document.createElement("span");
output.appendChild(span);  
recognition.interimResults = true;
recognition.lang = 'en-US';

const renderWords = (item) => `
<div class="word" data-myimage="${item.image}" data-myaudio="${item.audio}" data-transl="${item.translate}" data-wrt="${item.word}">
  <img src="./assets/images/speak.png" class="volume">  
  <p class="word-writing">${item.word}</p>          
  <p class="word-transcription">${item.transcription}</p>
</div>
`
const renderGameResult = (item) =>`
  <div class="res-word" data-audio="${item.dataset.myaudio}">
    <img src="./assets/images/speak.png" class="res-volume">    
    <span class="res-writing">${item.dataset.wrt} &mdash; </span>
    <span class="res-translation">${item.dataset.transl}</span>
   </div>`;

async function getWords(group, page) {
  const url = `${API}words?group=${group}&page=${page}`;
  const data = await getData(url);
  // console.log("getWords -> data.map(word => new Word(word))", data.map(word => new Word(word))); 
  return data.map(word => new Word(word));
}

// Events
const words = document.getElementsByClassName('word');
const guessed = [];
let trainMode = true;

// show game results
function showResults() {
  succesItems.innerHTML = guessed.map(item => renderGameResult(item)).join("");
  succesNum.textContent = guessed.length;
  const wrong =[...words].filter((item) => (!guessed.includes(item)));
  errorsItems.innerHTML = wrong.map(item => renderGameResult(item)).join('');
  errNum.textContent = wrong.length;
  mainWrapper.classList.add('invisible');
  resultContainer.classList.remove('invisible');
}

function setDefaultState() {
  guessed.length = 0;
  trainMode = true;
  output.innerHTML = '';
  output.classList.add('invisible');
  currentImg.setAttribute('src', defaultImg);
  translation.textContent = '';
  [...words].forEach(el => el.classList.remove('active'));
  getWords(0,0).then(res => {
      wordsContainer.innerHTML = res.slice(0, 10).map(item => renderWords(item)).join('');
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
    showResults();
  }
      }
    }
  })

  recognition.start();
}


// listen pronounce

document.addEventListener('click', event => {
  // render words for game
  if (event.target.classList.contains('start-btn')) {
    startPage.classList.add('invisible');
    mainWrapper.classList.remove('invisible');
    getWords(0,0).then(res => {
      wordsContainer.innerHTML = res.slice(0, 10).map(item => renderWords(item)).join('');
    })
  }
  // sound on word click
  if (event.target.classList.contains('word') && trainMode) {
    const tr = event.target.dataset.transl;
    const sr = event.target.dataset.myimage;
    const au = event.target.dataset.myaudio;    
    translation.innerText = tr;
    currentImg.setAttribute('src', sr);
    imgAudio.setAttribute('src', au);
    imgAudio.play();
    [...words].forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
  }
  // sound on word click
  if (event.target.parentElement.classList.contains('word') && trainMode) {
    const tr =event.target.parentElement.dataset.transl;
    const sr = event.target.parentElement.dataset.myimage;
    const au = event.target.parentElement.dataset.myaudio;
    translation.innerText = tr;
    currentImg.setAttribute('src', sr);
    imgAudio.setAttribute('src', au);
    imgAudio.play();
    [...words].forEach(el => el.classList.remove('active'));
    event.target.parentElement.classList.add('active'); 
  }
  // restart button
  if (event.target.classList.contains('restart')) {
    setDefaultState();
    recognition.removeEventListener('end', handleRecognition);    
  }
  // button return
  if (event.target.classList.contains('return-btn')) {
    resultContainer.classList.add('invisible');
    mainWrapper.classList.remove('invisible');  
  }
  // button new game
  if (event.target.classList.contains('new-btn')) {
    resultContainer.classList.add('invisible');
    mainWrapper.classList.remove('invisible');
    setDefaultState();
    recognition.removeEventListener('end', handleRecognition);
  }
  // finish button
  if (event.target.classList.contains('finish')) {
    showResults();   
  }
  // pronounciation on result click
  if (event.target.classList.contains('res-word')) {
    imgAudio.setAttribute('src', event.target.dataset.audio);
    imgAudio.play();
  }
  if (event.target.parentElement.classList.contains('res-word')) {
    const au = event.target.parentElement.dataset.audio;
    imgAudio.setAttribute('src', au);
    imgAudio.play();
  }
}) 

// speech recognition on
  const speakBtn = document.querySelector('.speak');
  speakBtn.addEventListener('click', () => {
    trainMode = false;
    output.classList.remove('invisible');
    [...words].forEach(el => el.classList.remove('active'));
    translation.classList.add('invisible');
    recognition.start();    
  });
  

  recognition.addEventListener("result", (e) => {
    if (guessed.length === 10) {
      recognition.removeEventListener('end', handleRecognition);
      showResults();
    }
    const last = e.results.length - 1;
    const command = e.results[last][0].transcript;
    span.innerHTML = '';
    span.innerHTML = command; 
  });  

  recognition.addEventListener('end', handleRecognition);
  stopSpeak.addEventListener('click', ()=> {
    recognition.removeEventListener('end', handleRecognition);
    output.classList.add('invisible');
    trainMode = true;
    translation.classList.remove('invisible');
    translation.textContent = '';
  } ) 