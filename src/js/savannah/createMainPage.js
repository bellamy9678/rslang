import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {ERROR_SOUND_SRC, CORRECT_SOUND_SRC} from './consts';

export default function createMainPage() {
  const creator = new DOMElementCreator();
  const app = document.querySelector('.app');
  const nameOfTheGame = 'САВАННА';
  const infoText = 'Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.';
  const startButtonText = 'Начать';
  const bindingsText = 'Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ';
  const imgAlt = 'Image';
  const volumeImg = creator.create({
    elem: TAGS.IMG,
    classes: 'volume-up-icon',
    attr: [{
      src: './assets/images/volume-up.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const errorSound = creator.create({
    elem: TAGS.AUDIO,
    classes: 'error-sound',
    attr: [{
      src: ERROR_SOUND_SRC
    }]
  });
  const correctSound = creator.create({
    elem: TAGS.AUDIO,
    classes: 'correct-sound',
    attr: [{
      src: CORRECT_SOUND_SRC
    }]
  });
  const volumeMuteImg = creator.create({
    elem: TAGS.IMG,
    classes: 'volume-mute-icon',
    attr: [{
      src: './assets/images/volume-mute.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const volumeSettings = creator.create({
    elem: TAGS.DIV,
    classes: 'volume-settings',
    child: [volumeImg, volumeMuteImg, errorSound, correctSound]
  });
  const heartIcon1 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const heartIcon2 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const heartIcon3 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const heartIcon4 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const heartIcon5 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const healthPoints = creator.create({
    elem: TAGS.DIV,
    classes: 'health-point-scale',
    child: [heartIcon1, heartIcon2, heartIcon3, heartIcon4, heartIcon5]
  });
  const closingIcon = creator.create({
    elem: TAGS.IMG,
    classes: 'closing-icon',
    attr: [{
      src: './assets/images/times.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const heading = creator.create({
    elem: TAGS.H1,
    classes: 'info__heading',
    child: `${nameOfTheGame}`
  });
  const mainInfo = creator.create({
    elem: TAGS.P,
    classes: 'info__main-info',
    child: `${infoText}`
  });
  const buttonText = creator.create({
    elem: TAGS.P,
    child: `${startButtonText}`
  });
  const button = creator.create({
    elem: TAGS.DIV,
    classes: 'starting-button',
    child: [buttonText]
  });
  const infoContainer = creator.create({
    elem: TAGS.DIV,
    classes: 'info',
    child: [heading, mainInfo, button]
  });
  const keyboardIcon = creator.create({
    elem: TAGS.IMG,
    classes: 'keyboard-icon',
    attr: [{
      src: './assets/images/keyboard.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const hintText = creator.create({
    elem: TAGS.P,
    child: `${bindingsText}`
  });
  const hint = creator.create({
    elem: TAGS.DIV,
    classes: 'hint',
    child: [keyboardIcon, hintText]
  });
  const stoneIcon = creator.create({
    elem: TAGS.IMG,
    classes: 'stone-icon',
    attr: [{
      src: './assets/images/stone.svg'
    }, {
      alt: `${imgAlt}`
    }],
  });
  const settings = creator.create({
    elem: TAGS.DIV,
    classes: 'settings-wrapper',
    child: [volumeSettings, healthPoints, closingIcon]
  });
  const iconHolder = creator.create({
    elem: TAGS.DIV,
    classes: 'hint-wrapper',
    child: [hint, stoneIcon]
  });
  const infoWrapper = creator.create({
    elem: TAGS.DIV,
    classes: 'info-wrapper',
    child: [infoContainer]
  });
  app.append(settings, infoWrapper, iconHolder);
}
