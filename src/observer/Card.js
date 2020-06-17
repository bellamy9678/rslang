export default class Card {
  constructor(word) {
    this.card = word;
    this.elem = document.createDocumentFragment();
  }

  static createElement(settingsObj) {
    const elem = document.createElement(settingsObj.elem);
    if ( settingsObj.class ) {
      elem.classList.add(settingsObj.class);
    }
    if ( settingsObj.id ) {
      elem.id = settingsObj.id;
    }
    if ( settingsObj.type ) {
      elem.type = settingsObj.type;
      elem.name = settingsObj.name;
    }
    if ( settingsObj.alt ) {
      elem.alt = settingsObj.alt;
      elem.src = settingsObj.src;
    }
    if ( settingsObj.innerHtml ) {
      if (typeof settingsObj.innerHtml === 'string' ) {
        elem.innerHTML = settingsObj.innerHtml;
      } else {
        elem.append(settingsObj.innerHtml);
      }
    }
    return elem;
  }

  static getObjectOfTextExample(text) {
    const obj = {};
    [obj.first, obj.word] = text.split('<b>');
    [obj.word, obj.last] = obj.word.split('</b>');
    return obj;
  }

  create() {
    const wrapper = Card.createElement({
      elem: 'div',
      class: 'card'
    });

    const img = Card.createElement({
      elem: 'div',
      class: 'card__image',
      innerHtml : Card.createElement({
        elem: 'img',
        alt: 'help-image',
        src: 'https://cdn131.picsart.com/322512972170201.jpg?type=webp&to=crop&r=256',
        id: 'image-card-example'
      })
    });

    const transcription = Card.createElement({
      elem: 'div',
      class: 'card__text',
      id: 'transcription',
      innerHtml : this.card.transcription
    });

    const wordTranslate = Card.createElement({
      elem: 'div',
      class: 'card__text',
      id: 'word-translate',
      innerHtml : this.card.wordTranslate
    });

    const textExampleTranslate = Card.createElement({
      elem: 'div',
      class: 'card__text',
      id: 'text-example-translate',
      innerHtml : this.card.textExampleTranslate
    });

    const textMeaning = Card.createElement({
      elem: 'div',
      class: 'card__text',
      id: 'text-meaning',
      innerHtml : this.card.textMeaning
    });

    const textMeaningTranslate = Card.createElement({
      elem: 'div',
      class: 'card__text',
      id: 'text-meaning-translate',
      innerHtml : this.card.textMeaningTranslate
    });

    const textExample = Card.createElement({
      elem: 'div',
      class: 'card__text',
      id: 'text-example'
    });

    const textExampleObject = Card.getObjectOfTextExample(this.card.textExample);

    const textPartLeft = Card.createElement({
      elem: 'span',
      class: 'card__text_part',
      innerHtml : textExampleObject.first
    });

    const textPartRight = Card.createElement({
      elem: 'span',
      class: 'card__text_part',
      innerHtml : textExampleObject.last
    });

    const textWord = Card.createElement({
      elem: 'span',
      class: 'card__text_word',
      innerHtml : textExampleObject.word
    });

    const textInput = Card.createElement({
      elem: 'input',
      class: 'card__text_input',
      type: 'text',
      name: 'word',
      id: 'word'
    });

    textExample.append(textPartLeft);
    textExample.append(textInput);
    textExample.append(textWord);
    textExample.append(textPartRight);

    wrapper.append(img);
    wrapper.append(transcription);
    wrapper.append(wordTranslate);
    wrapper.append(textExample);
    wrapper.append(textExampleTranslate);
    wrapper.append(textMeaning);
    wrapper.append(textMeaningTranslate);

    const buttonGroupСomplexity = Card.createElement({
      elem: 'div',
      class: 'button-group'
    });

    const buttonGroupDictionary = buttonGroupСomplexity.cloneNode();
    const buttonGroupShowAnswer = buttonGroupСomplexity.cloneNode();

    const againButton = Card.createElement({
      elem: 'button',
      id: 'again-word-button',
      innerHtml : 'Снова'
    });

    const difficultButton = Card.createElement({
      elem: 'button',
      id: 'difficult-word-button',
      innerHtml : 'Трудно'
    });

    const goodButton = Card.createElement({
      elem: 'button',
      id: 'good-word-button',
      innerHtml : 'Хорошо'
    });

    const easyButton = Card.createElement({
      elem: 'button',
      id: 'easy-word-button',
      innerHtml : 'Легко'
    });

    buttonGroupСomplexity.append(againButton);
    buttonGroupСomplexity.append(difficultButton);
    buttonGroupСomplexity.append(goodButton);
    buttonGroupСomplexity.append(easyButton);

    const addToEasyButton = Card.createElement({
      elem: 'button',
      id: 'add-to-difficult-button',
      innerHtml : 'добавить в сложные'
    });

    const deleteFromDictionaryButton = Card.createElement({
      elem: 'button',
      id: 'delete-from-dictionary-button',
      innerHtml : 'удалить из изучаемых'
    });

    buttonGroupDictionary.append(addToEasyButton);
    buttonGroupDictionary.append(deleteFromDictionaryButton);

    const showAnswerButton = Card.createElement({
      elem: 'button',
      id: 'show-answer-button',
      innerHtml : 'Показать ответ'
    });

    buttonGroupShowAnswer.append(showAnswerButton);

    wrapper.append(buttonGroupСomplexity);
    wrapper.append(buttonGroupDictionary);
    wrapper.append(buttonGroupShowAnswer);



    this.elem.append(wrapper);
  }

  get() {
    this.create();
    return this.elem;
  }

}