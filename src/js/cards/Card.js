import DOMElementCreator from "../utils/DOMElementCreator";
import {
	TEXT_EXAMPLE_OPEN_TAG,
	TEXT_EXAMPLE_CLOSE_TAG,
	TEXT_MEANING_OPEN_TAG,
	TEXT_MEANING_CLOSE_TAG,
} from "./CardConstants";
import { BUTTONS_WORDS } from "../shared/Text";
import WORDS_EVENTS from "../observer/WordsEvents";

const fab = new DOMElementCreator();

export default class Card {
	constructor(word) {
		this.card = word;
	}

	static getObjectOfTextExample(text) {
		const obj = {};
		[obj.first, obj.word] = text.split(TEXT_EXAMPLE_OPEN_TAG);
		[obj.word, obj.last] = obj.word.split(TEXT_EXAMPLE_CLOSE_TAG);
		return obj;
	}

	static getObjectOfTextMeaning(text) {
		const obj = {};
		[obj.first, obj.word] = text.split(TEXT_MEANING_OPEN_TAG);
		[obj.word, obj.last] = obj.word.split(TEXT_MEANING_CLOSE_TAG);
		return obj;
	}

	static getTextExample(text) {
		const textExampleObject = Card.getObjectOfTextExample(text);

		const textPartLeft = fab.create({
			elem: "span",
			classes: "card__text_part",
			child: textExampleObject.first,
		});

		const textPartRight = fab.create({
			elem: "span",
			classes: "card__text_part",
			child: textExampleObject.last,
		});

		const textWord = fab.create({
			elem: "span",
			classes: "card__text_word",
			child: textExampleObject.word,
		});

		const textInput = fab.create({
			elem: "input",
			classes: "card__text_input",
			attr: [{ type: "text" }, { name: "input" }],
			name: "word",
			id: "word",
		});

		const textExample = fab.create({
			elem: "div",
			classes: "card__text",
			id: "text-example",
			child: [textPartLeft, textInput, textWord, textPartRight],
		});

		return textExample;
	}

	static getTextMeaning(text) {
		const textExampleObject = Card.getObjectOfTextMeaning(text);

		const textPartLeft = fab.create({
			elem: "span",
			classes: "card__meaning_part",
			child: textExampleObject.first,
		});

		const textPartRight = fab.create({
			elem: "span",
			classes: "card__meaning_part",
			child: textExampleObject.last,
		});

		const textWord = fab.create({
			elem: "span",
			classes: "card__meaning_word",
			child: textExampleObject.word,
		});

		const textMeaning = fab.create({
			elem: "div",
			classes: "card__text",
			id: "text-meaning",
			child: [textPartLeft, textWord, textPartRight],
		});

		return textMeaning;
	}

	create() {
		this.elem = document.createDocumentFragment();

		const img = fab.create({
			elem: "img",
			id: "image-card-example",
			attr: [{ src: this.card.image }, { alt: this.card.word }],
		});

		const imgContainer = fab.create({
			elem: "div",
			classes: "card__image",
			child: img,
		});

		const transcription = fab.create({
			elem: "div",
			classes: "card__text",
			id: "transcription",
			child: this.card.transcription,
		});

		const wordTranslate = fab.create({
			elem: "div",
			classes: "card__text",
			id: "word-translate",
			child: this.card.wordTranslate,
		});

		const textExampleTranslate = fab.create({
			elem: "div",
			classes: "card__text",
			id: "text-example-translate",
			child: this.card.textExampleTranslate,
		});

		const textMeaning = Card.getTextMeaning(this.card.textMeaning);

		const textMeaningTranslate = fab.create({
			elem: "div",
			classes: "card__text",
			id: "text-meaning-translate",
			child: this.card.textMeaningTranslate,
		});

		const textExample = Card.getTextExample(this.card.example);

		const againButton = fab.create({
			elem: "button",
			id: "again-word-button",
			child: BUTTONS_WORDS.again,
		});

		const currentWord = this.card;
		const againButtonEvent = new CustomEvent(WORDS_EVENTS.PUSHED_AGAIN, {
			detail: currentWord,
		});
		againButton.addEventListener("click", () =>
			againButton.dispatchEvent(againButtonEvent)
		);

		const hardButton = fab.create({
			elem: "button",
			id: "hard-word-button",
			child: BUTTONS_WORDS.hard,
		});

		const hardButtonEvent = new CustomEvent(WORDS_EVENTS.PUSHED_HARD, {
			detail: currentWord,
		});
		hardButton.addEventListener("click", () =>
			hardButton.dispatchEvent(hardButtonEvent)
		);

		const goodButton = fab.create({
			elem: "button",
			id: "good-word-button",
			child: BUTTONS_WORDS.good,
		});

		const goodButtonEvent = new CustomEvent(WORDS_EVENTS.PUSHED_GOOD, {
			detail: currentWord,
		});
		goodButton.addEventListener("click", () =>
			goodButton.dispatchEvent(goodButtonEvent)
		);

		const easyButton = fab.create({
			elem: "button",
			id: "easy-word-button",
			child: BUTTONS_WORDS.easy,
		});

		const easyButtonEvent = new CustomEvent(WORDS_EVENTS.PUSHED_EASY, {
			detail: currentWord,
		});
		easyButton.addEventListener("click", () =>
			easyButton.dispatchEvent(easyButtonEvent)
		);

		const buttonGroupComplexity = fab.create({
			elem: "div",
			class: "button-group",
			child: [againButton, hardButton, goodButton, easyButton],
		});

		const addToDifficultButton = fab.create({
			elem: "button",
			id: "add-to-difficult-button",
			child: BUTTONS_WORDS.addToDifficult,
		});

		const addToEasyButtonEvent = new CustomEvent(
			WORDS_EVENTS.PUSHED_ADD_TO_DIFFICULT,
			{ detail: currentWord }
		);
		addToDifficultButton.addEventListener("click", () =>
			addToDifficultButton.dispatchEvent(addToEasyButtonEvent)
		);

		const deleteFromDictionaryButton = fab.create({
			elem: "button",
			id: "delete-from-dictionary-button",
			child: BUTTONS_WORDS.deleteFromDictionary,
		});

		const deleteFromDictionaryEvent = new CustomEvent(
			WORDS_EVENTS.PUSHED_REMOVE_FROM_DICTIONARY,
			{ detail: currentWord }
		);

		deleteFromDictionaryButton.addEventListener("click", () =>
			deleteFromDictionaryButton.dispatchEvent(deleteFromDictionaryEvent)
		);

		const buttonGroupDictionary = fab.create({
			elem: "div",
			class: "button-group",
			child: [addToDifficultButton, deleteFromDictionaryButton],
		});

		const showAnswerButton = fab.create({
			elem: "button",
			id: "show-answer-button",
			child: BUTTONS_WORDS.showAnswer,
		});

		const showAnswerButtonEvent = new CustomEvent(
			WORDS_EVENTS.PUSHED_SHOW_ANSWER_BUTTON,
			{ detail: currentWord }
		);
		showAnswerButton.addEventListener("click", () =>
			showAnswerButton.dispatchEvent(showAnswerButtonEvent)
		);

		const buttonGroupShowAnswer = fab.create({
			elem: "div",
			class: "button-group",
			child: showAnswerButton,
		});

		const audioWord = fab.create({
			elem: "audio",
			id: "audio-word",
			attr: [{ controls: true }, { src: this.card.audio }],
		});

		const audioMeaning = fab.create({
			elem: "audio",
			id: "audio-meaning",
			attr: [{ controls: true }, { src: this.card.meaningAudio }],
		});

		const audioExample = fab.create({
			elem: "audio",
			id: "audio-example",
			attr: [{ controls: true }, { src: this.card.exampleAudio }],
		});

		const wrapper = fab.create({
			elem: "div",
			class: "card",
			child: [
				imgContainer,
				transcription,
				audioWord,
				wordTranslate,
				textExample,
				audioExample,
				textExampleTranslate,
				textMeaning,
				audioMeaning,
				textMeaningTranslate,
				buttonGroupComplexity,
				buttonGroupDictionary,
				buttonGroupDictionary,
				buttonGroupShowAnswer,
			],
		});

		this.elem = wrapper;
		return this.elem;
	}
}
