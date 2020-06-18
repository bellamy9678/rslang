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
const wordsContainer = document.querySelector('.words-container');
const renderWords = (item) => `
<div class="word">
  <audio class="pronounce">
    <source src=${item.audio}>    
  </audio>
  <i class="material-icons volume">volume_mute</i>         
  <p class="word-writing">${item.word}</p>          
  <p class="word-transcription">${item.transcription}</p>
  <p class="word-translation invisible">${item.translate}</p>
  <img class="word-img invisible" src=${item.image}>
</div>
`

async function getWords(group, page) {
  const url = `${API}words?group=${group}&page=${page}`;
  const data = await getData(url);
  //console.log("getWords -> data.map(word => new Word(word))", data.map(word => new Word(word))); 
  return data.map(word => new Word(word));
}


//My
getWords(0,0).then(res => {
  wordsContainer.innerHTML = res.slice(0, 10).map(item => renderWords(item)).join('');
})
//Events
const currentImg = document.querySelector('.current-img');
const translation = document.querySelector('.current-transl');
const words = document.getElementsByClassName('word');
const wordSpelling = document.getElementsByClassName('word-writing');
let score = 0;

//const words = document.querySelectorAll('.word');
//console.log(links);
//console.log(words);
document.addEventListener('click', event => {
  if (event.target.classList.contains('word')) {
    console.log(event.target);
    event.target.querySelector('.pronounce').play();
    let tr = event.target.querySelector('.word-translation').textContent;
    let sr = event.target.querySelector('.word-img').getAttribute('src');
    console.log(tr);
    console.log(sr);
    translation.innerText = tr;
    currentImg.setAttribute('src', sr);
    [...words].forEach(el => el.classList.remove('active'));
    console.log(words);
    event.target.classList.add('active');
  }
})

//Speech recognition

let output = document.querySelector('.word-output');
var span = document.createElement("span");
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

recognition.addEventListener("end", function(e) {
  [...wordSpelling].forEach(el => {
    if (el.textContent === span.innerHTML) {
      
      el.parentElement.classList.add('active');
      let ref = el.parentElement.querySelector('.word-img').getAttribute('src');
      currentImg.setAttribute('src', ref);
      score= score + 1;
    }
  })
  recognition.start();
});
