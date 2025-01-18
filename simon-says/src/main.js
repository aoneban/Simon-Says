import '@/styles.scss';
import { buttonNumbers, buttonLetters } from './data';
import removeClass from './modules/removeClass';
import addHiddenClass from './modules/addClass';
import { loopForCheckButtons } from './modules/generateRandomNum';
import { modalResponses } from './modules/modal';
import {
  removeModalWindow,
  disabledButtons,
  disableInput,
  prepareForNewGame,
  getCurrentArrayButtons,
  checkForbiddenSymbolsToInput,
  checkCurrentLevel,
  prepareInputToEnter,
  clearInputFromText,
  forbiddenEditInput,
  generatePauseBetweenButtons,
  showElements,
} from './modules/utils';

class Keyboard {
  round = 1;
  attempts = 0;
  easy = true;
  medium = false;
  hard = false;
  arrayLetters = [];
  tempArray = [];
  currentLetters = 2;
  totalButtons = 10;
  isProcessingKey = false;
  arrayToShowInConsole = [];

  constructor(arr) {
    this.arr = arr;
    this.keyboardOne = null;
    this.keyboardTwo = null;
  }

  createGreetings() {
    const bodyElement = document.getElementById('app');
    const greetings = document.createElement('h1');
    greetings.classList.add('greetings');
    greetings.textContent = 'Welcome to the "Simon says"';
    bodyElement.append(greetings);
  }

  changeRound() {
    document.querySelector('.round').textContent = `Round: ${this.round}/5`;
  }

  createLevelButtons() {
    const bodyElement = document.getElementById('app');
    const wrapperButtons = document.createElement('div');
    wrapperButtons.classList.add('wrapper-buttons');

    const newGame = document.createElement('button');
    newGame.classList.add('button-level', 'button-new-game', 'hidden');
    newGame.textContent = 'New Game';
    newGame.addEventListener('click', () => {
      newGame.classList.add('hidden');
      this.round = 1;
      this.attempts = 0;
      this.arrayLetters = [];
      this.tempArray = [];
      this.currentLetters = 2;
      this.totalButtons = 10;
      this.arrayToShowInConsole = [];
      prepareForNewGame();
      this.changeRound();
    });

    const buttonEasy = document.createElement('button');
    buttonEasy.classList.add('button-level', 'easy');
    buttonEasy.textContent = 'Easy';
    buttonEasy.addEventListener('click', () => {
      this.easy = true;
      this.medium = false;
      this.hard = false;
      addHiddenClass('hidden', 'letter');
      removeClass('hidden', 'figure');
    });

    const buttonMedium = document.createElement('button');
    buttonMedium.classList.add('button-level', 'medium');
    buttonMedium.textContent = 'Medium';
    buttonMedium.addEventListener('click', () => {
      if (this.round === 1) {
        this.easy = false;
        this.medium = true;
        this.hard = false;
        disabledButtons();
        addHiddenClass('hidden', 'figure');
        removeClass('hidden', 'letter');
      }
    });

    const buttonHard = document.createElement('button');
    buttonHard.classList.add('button-level', 'hard');
    buttonHard.textContent = 'Hard';
    buttonHard.addEventListener('click', () => {
      if (this.round === 1) {
        this.easy = false;
        this.medium = false;
        this.hard = true;
        disabledButtons();
        removeClass('hidden', 'letter');
        removeClass('hidden', 'figure');
      }
    });

    wrapperButtons.append(buttonEasy, buttonMedium, buttonHard, newGame);
    bodyElement.append(wrapperButtons);
  }

  createWrapperApp() {
    const bodyElement = document.getElementById('app');
    this.createGreetings();
    this.createLevelButtons();

    const wrapperInput = document.createElement('div');
    wrapperInput.classList.add('wrapper-input');

    const input = document.createElement('input');
    input.classList.add('text-input');
    input.disabled = true;
    input.addEventListener('input', (event) => {
      this.handlerToWinOrLose();
    });

    const round = document.createElement('p');
    round.classList.add('round');
    round.textContent = `Round: ${this.round}/5`;

    wrapperInput.append(round, input);
    bodyElement.append(wrapperInput);

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add('keyboard-wrapper');
    keyboardWrapper.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('button')) {
        const input = document.querySelector('.text-input');
        input.value += event.target.textContent;
        this.handleInput.call(
          this,
          input,
          this.arrayToShowInConsole,
          this.tempArray,
          () => {
            event.target.classList.add('active');
            setTimeout(() => {
              event.target.classList.remove('active');
            }, 200);
          },
        );
      }
    });
    wrapper.append(keyboardWrapper);
    bodyElement.append(wrapper);

    this.keyboardOne = document.createElement('div');
    this.keyboardOne.classList.add('keyboard-one');

    this.keyboardTwo = document.createElement('div');
    this.keyboardTwo.classList.add('keyboard-two');
    keyboardWrapper.append(this.keyboardOne, this.keyboardTwo);
  }

  createKeyboardNumbers(arr) {
    arr.map((item) => {
      const button = document.createElement('button');
      button.classList.add('button', 'figure');
      button.disabled = true;
      button.append(item);
      this.keyboardOne.append(button);
    });
  }

  createKeyboardLetters(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      const block = document.createElement('div');
      block.classList.add('block');
      arr[i].map((item) => {
        const button = document.createElement('button');
        button.classList.add('button', 'letter', 'hidden');
        button.append(item);
        block.append(button);
      });
      this.keyboardTwo.append(block);
    }
  }

  createStartButton() {
    const button = document.createElement('button');
    button.classList.add('start-button');
    button.textContent = 'Start';
    button.addEventListener('click', () => {
      showElements();
      button.classList.add('hidden');
      setTimeout(() => {
        checkCurrentLevel(this.easy, this.medium, this.hard);
        loopForCheckButtons(
          this.easy,
          this.medium,
          this.hard,
          this.arrayLetters,
          this.currentLetters,
        );
        getCurrentArrayButtons(this.tempArray);
        console.log(this.arrayLetters);
        generatePauseBetweenButtons(
          this.arrayLetters,
          this.tempArray,
          this.arrayToShowInConsole,
        );
        setTimeout(() => {
          prepareInputToEnter(false, this.currentLetters);
          document.querySelector('.button-new-game').disabled = false;
        }, this.currentLetters * 1000);
      }, 1000);
    });
    this.keyboardTwo.append(button);
  }

  createSequenceButton() {
    const button = document.createElement('button');
    const input = document.querySelector('.text-input');
    button.classList.add('sequence-button', 'hidden');
    button.textContent = 'Repeat Sequence';
    button.disabled = true;
    button.addEventListener('click', () => {
      this.attempts += 1;
      removeModalWindow();
      document.querySelector('.button-new-game').disabled = true;
      input.disabled = true;
      document
        .querySelectorAll('.button')
        .forEach((button) => (button.disabled = true));
      button.disabled = true;
      clearInputFromText();
      generatePauseBetweenButtons(
        this.arrayLetters,
        this.tempArray,
        // this.arrayToShowInConsole,
      );
      setTimeout(() => {
        prepareInputToEnter(false, this.currentLetters, true);
        document.querySelector('.button-new-game').disabled = false;
      }, this.currentLetters * 1000);
    });
    this.keyboardTwo.append(button);
  }

  createNextButton() {
    const button = document.createElement('button');
    button.classList.add('next-button', 'hidden');
    button.textContent = 'Next';
    button.addEventListener('click', () => {
      this.changeRound();
      document.querySelector('.button-new-game').disabled = true;
      document.querySelector('.sequence-button').disabled = true;
      document.querySelector('.sequence-button').classList.remove('hidden');
      button.classList.add('hidden');
      checkCurrentLevel(this.easy, this.medium, this.hard);
      loopForCheckButtons(
        this.easy,
        this.medium,
        this.hard,
        this.arrayLetters,
        this.currentLetters,
      );
      getCurrentArrayButtons(this.tempArray);
      console.log(this.arrayLetters);
      generatePauseBetweenButtons(
        this.arrayLetters,
        this.tempArray,
        this.arrayToShowInConsole,
      );
      setTimeout(() => {
        prepareInputToEnter(false, this.currentLetters);
        document.querySelector('.button-new-game').disabled = false;
      }, this.currentLetters * 1000);
    });
    this.keyboardTwo.append(button);
  }

  keydownHandler() {
    document.addEventListener('keydown', (event) => {
      if (this.isProcessingKey) {
        event.preventDefault();
        return;
      }

      forbiddenEditInput(event);
      const buttons = document.querySelectorAll('.button');

      buttons.forEach((button) => {
        if (button.textContent === event.key && button.disabled === false) {
          this.isProcessingKey = true;
          button.classList.add('active');

          setTimeout(() => {
            button.classList.remove('active');
            this.isProcessingKey = false;
          }, 500);
        }
      });
    });
  }

  handlerToWinOrLose() {
    checkForbiddenSymbolsToInput(this.tempArray);
    const input = document.querySelector('.text-input');
    this.handleInput.call(
      this,
      input,
      this.arrayToShowInConsole,
      this.tempArray,
      null,
    );
  }

  handleInput(input, arrayToShowInConsole, tempArray, callback) {
    input.focus();
    const letterToCheck = input.value.toLowerCase();
    const copyArray = arrayToShowInConsole;
    const index = letterToCheck.length;
    const letter = letterToCheck[letterToCheck.length - 1];

    if (copyArray[index - 1] !== letter) {
      this.attempts += 1;
      if (this.attempts > 1) {
        modalResponses('Game Over', false);
        this.attempts = 0;
      } else {
        modalResponses(
          'It is wrong. You can try once again. Press: Repeat Sequence',
          false,
        );
      }
      disableInput(this.tempArray);
      return;
    }

    if (letterToCheck === copyArray.join('')) {
      this.round += 1;
      this.attempts = 0;
      if (this.round > 5) {
        modalResponses('You are the Champion! Game Over.', true);
        this.round = 1;
        input.value = '';
        disableInput(this.tempArray);
        document.querySelector('.next-button').classList.add('hidden');
        document.querySelector('.sequence-button').classList.remove('hidden');
        document.querySelector('.sequence-button').disabled = true;
      } else {
        modalResponses('You win this round', true);
        disableInput(this.tempArray);
        arrayToShowInConsole.length = 0;
        this.arrayLetters.length = 0;
        tempArray.length = 0;
        this.currentLetters += 2;
        clearInputFromText();
        document.querySelector('.next-button').classList.remove('hidden');
        document.querySelector('.sequence-button').classList.add('hidden');
      }
    }

    if (callback) callback();
  }
}

const keyboard = new Keyboard();

function initialGame() {
  keyboard.createWrapperApp();
  keyboard.createKeyboardNumbers(buttonNumbers);
  keyboard.createKeyboardLetters(buttonLetters);
  keyboard.createStartButton();
  keyboard.createSequenceButton();
  keyboard.createNextButton();
  keyboard.keydownHandler();
}
initialGame();
