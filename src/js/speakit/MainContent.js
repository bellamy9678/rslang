import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

import { restartBtnText, speakBtnText, stopSpeakText, finishBtnText } from './speakconst';


const mainImage = './assets/images/eng.jpg';
const microphoneOn ='./assets/images/mikro.png'; 
const defaultSrc = '';
const iterationStart = 1;
const iterationEnd = 7;
export default function initMainContent() {
  const newElem = new DOMElementCreator();

  function createLevelsBtn() {
    const arrBtn = [];
    for( let i = iterationStart; i < iterationEnd; i += 1) {
      const test = newElem.create({
        elem: TAGS.BUTTON,
        classes: 'level-btn',  
        child: i,
      });
      arrBtn.push(test); 
    }
    return arrBtn;
  }
    
  const level = newElem.create({
    elem: TAGS.DIV,
    classes: 'level',  
    child: createLevelsBtn(),
  });
  const currentImg = newElem.create({
    elem: TAGS.IMG,
    classes: 'current-image',
    attr: [{
      src: mainImage,
    }, {
      alt: 'Image'
    }],
  });
  
  const translation = newElem.create({
    elem: TAGS.P,
    classes: 'current-transl',  
  });

  const Img = newElem.create({
    elem: TAGS.IMG,
    classes: 'micro',
    attr: {
      src: microphoneOn,
    },
  });
  
  const output = newElem.create({
    elem: TAGS.P,
    classes: ['word-output', 'none'],
    child: Img,
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
      src: defaultSrc,
    } 
  });
  
  const imgAudio = newElem.create({
    elem: TAGS.AUDIO,
    classes: 'pronounce',  
    child: [audioSrc],
  });
  
  const restButton = newElem.create({
    elem: TAGS.BUTTON,
    classes: ['button', 'button_colored','restart'],  
    child: restartBtnText,
  });  
  
  const speakButton = newElem.create({
    elem: TAGS.BUTTON,
    classes: ['button', 'button_colored','speak'],  
    child: speakBtnText,
  });
  
  const  stopSpeak = newElem.create({
    elem: TAGS.BUTTON,
    classes: ['button', 'button_colored','stop-speak'],  
    child: stopSpeakText,
  });
  
  const finishButton = newElem.create({
    elem: TAGS.BUTTON,
    classes: ['button', 'button_colored','finish'],  
    child: finishBtnText,
  });
  
  const btnContainer = newElem.create({
    elem: TAGS.DIV,
    classes: 'buttons-container',  
    child: [restButton, speakButton,  stopSpeak, finishButton],
  });
  
  const mainWrapper = newElem.create({
    elem: TAGS.DIV,
    classes: ['main-container', 'none'],  
    child: [level, imgCont, wordsContainer, imgAudio, btnContainer],
  });

  return mainWrapper;
}