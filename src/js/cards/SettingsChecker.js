import { DISPLAY_NONE_CLASS } from './CardConstants';

export default class SettingsChecker {
	init() {
		this.card = document.querySelector('#card-container');
		this.translate = document.querySelector('#word-translate');
		this.meaning = document.querySelector('#text-meaning');
		this.meaningTranslate = document.querySelector('#text-meaning-translate');
		this.example = document.querySelector('#text-example');
		this.exampleTranslate = document.querySelector('#text-example-translate');
		this.transcription = document.querySelector('#transcription');
		this.picture = document.querySelector('#image-card-example');

		this.deleteButton = document.querySelector(
			'#delete-from-dictionary-button'
		);
		this.difficultButton = document.querySelector('#add-to-difficult-button');
		this.complexityButtons = document.querySelector('#complexity-buttons');
		this.showAnswerButton = document.querySelector('#show-answer-button');

		this.playWord = document.querySelector('#audio-word');
		this.playMeaning = document.querySelector('#audio-example');
		this.playExample = document.querySelector('#audio-meaning');
	}

	checkTranslate(settings) {
		if (settings.translate) {
			this.translate.classList.remove(DISPLAY_NONE_CLASS);
		}
	}

	checkMeaning(settings) {
		if (settings.meaning) {
			this.meaning.classList.remove(DISPLAY_NONE_CLASS);
			if (settings.meaningTranslate) {
				this.meaningTranslate.classList.remove(DISPLAY_NONE_CLASS);
			}
			if (settings.playMeaning) {
				this.playMeaning.classList.remove(DISPLAY_NONE_CLASS);
			}
		}
	}

	checkPicture(settings) {
		if (settings.picture) {
			this.picture.classList.remove(DISPLAY_NONE_CLASS);
		}
	}

	checkTranscription(settings) {
		if (settings.transcription) {
			this.transcription.classList.remove(DISPLAY_NONE_CLASS);
		}
	}

	checkExample(settings) {
		if (settings.example) {
			this.example
				.querySelector('#example-part-first')
				.classList.remove(DISPLAY_NONE_CLASS);
			this.example
				.querySelector('#example-part-last')
				.classList.remove(DISPLAY_NONE_CLASS);
			if (settings.exampleTranslate) {
				this.exampleTranslate.classList.remove(DISPLAY_NONE_CLASS);
			}
			if (settings.playExample) {
				this.playExample.classList.remove(DISPLAY_NONE_CLASS);
			}
			if (settings.playWord) {
				this.playWord.classList.remove(DISPLAY_NONE_CLASS);
			}
		}
	}

	checkShowAnswerButton(settings) {
		if (settings.showAnswerButton) {
			this.showAnswerButton.classList.remove(DISPLAY_NONE_CLASS);
		}
	}

	checkDeleteButton(settings) {
		if (settings.deleteButton) {
			this.deleteButton.classList.remove(DISPLAY_NONE_CLASS);
		}
	}

	checkDifficultButton(settings) {
		if (settings.difficultButton) {
			this.difficultButton.classList.remove(DISPLAY_NONE_CLASS);
		}
	}

	checkComplexityButtons(settings) {
		if (settings.complexityButtons) {
			this.complexityButtons.classList.remove(DISPLAY_NONE_CLASS);
		}
	}

	checkAllSettings(settings) {
		this.checkPicture(settings);
		this.checkTranscription(settings);
		this.checkTranslate(settings);

		this.checkExample(settings);
		this.checkMeaning(settings);

		this.checkShowAnswerButton(settings);
		this.checkDeleteButton(settings);
		this.checkDifficultButton(settings);
		this.checkComplexityButtons(settings);
	}
}
