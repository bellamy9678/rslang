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
const template = `
<div class="start-page">
    <h1 class="game-name"> Speak it</h1>
    <div class="description">
      <p>Click on the world to hear them sound</p>
      <p>Click on the button and speak the words into the microphone </p>
    </div>
    <button class="start-btn">Start Game</button>
  </div>
  
  <div class="wrapper invisible">
    <button>New Set</button>
    <div class="image-container">
      <img src="../src/assets/images/engl.jpg" class="current-img">
      <p class="current-transl"></p>
      <p class="word-output invisible">
        <i class="material-icons mic-off">mic_off</i>
      </p>
    </div>
    <div class="words-container">

    </div>
    <audio class="pronounce">
      <source src=''>    
    </audio>
    <div class="buttons-container">
      <button class="restart">Restart</button>
      <button class="speak">Speak please</button>
      <button class="finish">Finish</button>
    </div>
  </div>
  <div class="result invisible">
    <div class="result-container">
      <p class="errors">Ошибок
        <span class="errors-num"></span>
      </p>
      <div class="errors-items">

      </div>
      <p class="succes">Знаю
        <span class="succes-num"></span>
      </p>
      <div class="succes-items">

      </div>
      <div class="results-btn">
        <button class="return-btn">Return</button>
        <button class="new-btn">New game</button>
      </div>
    </div>
  </div>
 
</body>
`
const body = document.querySelector('body');
body.innerHTML = template;
const startPage = document.querySelector('.start-page');
const mainWrapper = document.querySelector('.wrapper');
const wordsContainer = document.querySelector('.words-container');

const renderWords = (item) => `
<div class="word" data-myimage="${item.image}" data-myaudio="${item.audio}" data-transl="${item.translate}" data-wrt="${item.word}">  
  <p class="word-writing">${item.word}</p>          
  <p class="word-transcription">${item.transcription}</p>
</div>
`
const renderGameResult = (item) => {
  return `<div class="res-word" data-audio="${item.dataset.myaudio}">    
    <span class="res-writing">${item.dataset.wrt} &mdash; </span>
    <span class="res-translation">${item.dataset.transl}</span>
   </div>`;
}

async function getWords(group, page) {
  const url = `${API}words?group=${group}&page=${page}`;
  const data = await getData(url);
  // console.log("getWords -> data.map(word => new Word(word))", data.map(word => new Word(word))); 
  return data.map(word => new Word(word));
}


// My

// Events
const currentImg = document.querySelector('.current-img');
const translation = document.querySelector('.current-transl');
// const finishBtn = document.querySelector('.finish');
const resultContainer = document.querySelector('.result');
const errorsItems = document.querySelector('.errors-items');
const succesItems = document.querySelector('.succes-items');
const errNum = document.querySelector('.errors-num');
const succesNum = document.querySelector('.succes-num');
const microphone = document.querySelector('.mic-off');
const defaultImg = "../src/assets/images/engl.jpg";
const words = document.getElementsByClassName('word');
const imgAudio = document.querySelector('.pronounce');
const output = document.querySelector('.word-output');
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
    /* trainMode = true;
    guessed.length = 0;
    output.innerHTML = '';
    output.classList.add('invisible'); 
    getWords(0,0).then(res => {
      wordsContainer.innerHTML = res.slice(0, 10).map(item => renderWords(item)).join('');
    }) */
    setDefaultState();
  }
  // finish button
  if (event.target.classList.contains('finish')) {
    showResults();
  }
})

// Speech recognition


  
  const span = document.createElement("span");
  output.appendChild(span);
  const SpeechRecognition = window.webkitSpeechRecognition;
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

/* speakBtn.addEventListener('click', speak);
microphone.addEventListener('click', event => {
  speakBtn.removeEventListener('click', speak);
}) */
// speech recognition
/* let output = document.querySelector('.word-output');
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
