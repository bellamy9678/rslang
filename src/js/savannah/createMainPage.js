import DOMElementCreator from '../utils/DOMElementCreator'
import TAGS from '../shared/Tags.json';

export default function createMainPage() {
  const creator = new DOMElementCreator();
  const header = document.querySelector('HEADER');
  const footer = document.querySelector('FOOTER');
  const main = document.querySelector('MAIN');
  const volumeImg = creator.create({
    elem: TAGS.IMG,
    classes: 'volume-up-icon',
    attr: [{
      src: './assets/images/volume-up.svg'
    }, {
      alt: 'Image'
    }],
  });
  const volumeMuteImg = creator.create({
    elem: TAGS.IMG,
    classes: 'volume-mute-icon',
    attr: [{
      src: './assets/images/volume-mute.svg'
    }, {
      alt: 'Image'
    }],
  });
  const volumeSettings = creator.create({
    elem: TAGS.DIV,
    classes: 'volume-settings',
    child: [volumeImg, volumeMuteImg]
  });
  const heartIcon1 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: 'Image'
    }],
  });
  const heartIcon2 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: 'Image'
    }],
  });
  const heartIcon3 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: 'Image'
    }],
  });
  const heartIcon4 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: 'Image'
    }],
  });
  const heartIcon5 = creator.create({
    elem: TAGS.IMG,
    classes: 'heart-icon',
    attr: [{
      src: './assets/images/heart.svg'
    }, {
      alt: 'Image'
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
      alt: 'Image'
    }],
  });
  const heading = creator.create({
    elem: TAGS.H1,
    classes: 'info__heading',
    child: 'САВАННА'
  });
  const mainInfo = creator.create({
    elem: TAGS.P,
    classes: 'info__main-info',
    child: 'Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.'
  });
  const buttonText = creator.create({
    elem: TAGS.P,
    child: 'Начать'
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
      alt: 'Image'
    }],
  });
  const hintText = creator.create({
    elem: TAGS.P,
    child: 'Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ'
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
      alt: 'Image'
    }],
  });
  header.append(volumeSettings, healthPoints, closingIcon);
  main.append(infoContainer);
  footer.append(hint, stoneIcon)
}
