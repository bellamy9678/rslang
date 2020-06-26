/* import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

const newElem = new DOMElementCreator();
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

const firstPage = newElem.create({
  elem: TAGS.DIV,
  classes: 'start-page',  
  child: [gameName, gameDescription, gameButton],
});

export { startPage}; */