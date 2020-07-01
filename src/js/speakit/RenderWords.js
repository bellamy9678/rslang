import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';


const speakerIcon = './assets/images/speak.png';
export default function renderWords(item) {
  const newElem = new DOMElementCreator();
  const wordWriting = newElem.create({
    elem: TAGS.P,
    classes: 'word-writing',
    child: `${item.word}`,
  })

  const wordTranscript = newElem.create({
    elem: TAGS.P,
    classes: 'word-transcription',
    child: `${item.transcription}`,
  })

  const Img = newElem.create({
    elem: TAGS.IMG,
    classes: 'volume',
    attr: {
      src: speakerIcon,
    },
  });

  const word = newElem.create({
    elem: TAGS.DIV,
    classes: 'word',
    attr: [{
      'data-myimage': `${item.image}`,
    }, {
     'data-myaudio': `${item.audio}`,
    }, {
      'data-transl': `${item.translate}`,
    }, {
      'data-wrt': `${item.word}`,
    }, {
      'data-transcription': `${item.transcription}`,
    }],
    child: [Img, wordWriting, wordTranscript]
  });
  
  return word
}