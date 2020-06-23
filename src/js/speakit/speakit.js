const API = 'https://afternoon-falls-25894.herokuapp.com/';
const ASSETS_STORAGE = 'https://raw.githubusercontent.com/chaba-chaba/rslang-data/master/';

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

// My 

const startPage = document.querySelector('.start-page');
const mainWrapper = document.querySelector('.wrapper');
const wordsContainer = document.querySelector('.words-container');

const renderWords = (item) => `
<div class="word" data-myimage="${item.image}" data-myaudio="${item.audio}" data-transl="${item.translate}" data-wrt="${item.word}">  
  <i class="material-icons volume">volume_mute</i>         
  <p class="word-writing">${item.word}</p>          
  <p class="word-transcription">${item.transcription}</p>
</div>
`
const renderGameResult = (item) => {
  return `<div class="res-word" data-audio="${item.dataset.myaudio}">
    <i class="material-icons volume-res">volume_mute</i>
    <span class="res-writing">${item.dataset.wrt} &mdash; </span>
    <span class="res-translation">${item.dataset.transl}</span>
   </div>`;
}

async function getWords(group, page) {
  const url = `${API}words?group=${group}&page=${page}`;
  const data = await getData(url);
  //console.log("getWords -> data.map(word => new Word(word))", data.map(word => new Word(word))); 
  return data.map(word => new Word(word));
}


//My

//Events
const currentImg = document.querySelector('.current-img');
const translation = document.querySelector('.current-transl');
const finishBtn = document.querySelector('.finish');
const resultContainer = document.querySelector('.result');
const errorsItems = document.querySelector('.errors-items');
const succesItems = document.querySelector('.succes-items');
const errNum = document.querySelector('.errors-num');
const succesNum = document.querySelector('.succes-num');
const microphone = document.querySelector('.mic-off');
const defaultImg = "../src/assets/images/engl.jpg";
let words = document.getElementsByClassName('word');
let wordSpelling = document.getElementsByClassName('word-writing');
let imgAudio = document.querySelector('.pronounce');
let output = document.querySelector('.word-output');
let guessed = [];
let trainMode = true;

// show game results
function showResults() {
  succesItems.innerHTML = guessed.map(item => renderGameResult(item)).join("");
  succesNum.textContent = guessed.length;
  let wrong =[...words].filter((item) => (!guessed.includes(item)));
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
  getWords(0,0).then(res => {
      wordsContainer.innerHTML = res.slice(0, 10).map(item => renderWords(item)).join('');
    })
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
    let tr = event.target.dataset.transl;
    let sr = event.target.dataset.myimage;
    let au = event.target.dataset.myaudio;    
    translation.innerText = tr;
    currentImg.setAttribute('src', sr);
    imgAudio.setAttribute('src', au);
    imgAudio.play();
    [...words].forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
  }
  //sound on word click
  if (event.target.parentElement.classList.contains('word') && trainMode) {
    let tr =event.target.parentElement.dataset.transl;
    let sr = event.target.parentElement.dataset.myimage;
    let au = event.target.parentElement.dataset.myaudio;
    translation.innerText = tr;
    currentImg.setAttribute('src', sr);
    imgAudio.setAttribute('src', au);
    imgAudio.play();
    [...words].forEach(el => el.classList.remove('active'));
    event.target.parentElement.classList.add('active'); 
  }
  //restart button
  if (event.target.classList.contains('restart')) {
    setDefaultState();
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
    /*trainMode = true;
    guessed.length = 0;
    output.innerHTML = '';
    output.classList.add('invisible'); 
    getWords(0,0).then(res => {
      wordsContainer.innerHTML = res.slice(0, 10).map(item => renderWords(item)).join('');
    })*/
    setDefaultState();
  }
  // finish button
  if (event.target.classList.contains('finish')) {
    showResults();
  }
})

//Speech recognition


  
  let span = document.createElement("span");
  output.appendChild(span);
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  function handleRecognition() {
    if (guessed.length === 10) {
      showResults();
    }
    [...words].forEach(el => {
      if(el.querySelector('.word-writing').textContent.toLowerCase() === span.innerHTML.toLowerCase()) {
        if (!guessed.includes(el)) {
          el.classList.add('active');
          currentImg.setAttribute('src', el.dataset.myimage);        
          guessed.push(el);
        }      
      }
    })
    console.log(guessed.length);
    recognition.start();
  }


  const speakBtn = document.querySelector('.speak');
  speakBtn.addEventListener('click', () => {
    recognition.start();
    trainMode = false;
    output.classList.remove('invisible');
  });
  

  recognition.addEventListener("result", function(e) {
    const last = e.results.length - 1;
    const command = e.results[last][0].transcript;
    span.innerHTML = '';
    span.innerHTML = command;  
  });  

  recognition.addEventListener('end', handleRecognition);
  microphone.addEventListener('click', ()=> {
    recognition.removeEventListener('end', handleRecognition);
    output.classList.add('invisible');
    trainMode = true;
  } )





















/*speakBtn.addEventListener('click', speak);
microphone.addEventListener('click', event => {
  speakBtn.removeEventListener('click', speak);
})*/





//speech recognition
/*
let output = document.querySelector('.word-output');
let span = document.createElement("span");
output.appendChild(span);
//console.log();
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.start();

recognition.addEventListener("result", function(e) {
  let text = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('');
  span.innerHTML = '';
  span.innerHTML = text;  
});

recognition.addEventListener('end', function(e) {
  [...words].forEach(el => {
    if(el.querySelector('.word-writing').textContent.toLowerCase() === span.innerHTML.toLowerCase()) {
      if (!guessed.includes(el)) {
        el.classList.add('active');
        currentImg.setAttribute('src', el.dataset.myimage);
        //score++;
        console.log(score);
        guessed.push(el);
      }      
    } // перенести в отдельную функцию
  })
  console.log(guessed);
  recognition.start();
})
*/
