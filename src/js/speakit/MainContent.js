import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

import { restartBtnText, speakBtnText, stopSpeakText, finishBtnText } from './speakconst';


const mainImage = './assets/images/eng.jpg';
const defaultSrc = '';
export default function initMainContent() {
  const newElem = new DOMElementCreator();
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
      src: mainImage,
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
    classes: ['word-output', 'none'],
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