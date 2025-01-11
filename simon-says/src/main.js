import './styles.scss';
import { buttonNumbers, buttonLetters, totalButtons } from './data';
import removeClass from './modules/removeClass';
import addHiddenClass from './modules/addClass';
import { getRandomNumberInRange } from './modules/generateRandomNum';

class Keyboard {
  round = 1;
  easy = true;
  medium = false;
  hard = false;
  arrayLetters = [];
  tempArray = [];
  currentLetters = 10;
  totalButtons = 10;

  constructor(arr) {
    this.arr = arr;
    this.keyboardOne = null;
    this.keyboardTwo = null;
  }

  createGreetings() {
    const bodyElement = document.getElementById('app');
    const greetings = document.createElement('h1');
    greetings.classList.add('greetings');
    greetings.textContent = 'Welcome to the game "Simon says"';
    bodyElement.append(greetings);
  }

  changeRound() {
    this.round = 1;
    document.querySelector('.round').textContent = `Round: ${this.round}/5`;
  }

  createLevelButtons() {
    const bodyElement = document.getElementById('app');
    const wrapperButtons = document.createElement('div');
    wrapperButtons.classList.add('wrapper-buttons');

    const newGame = document.createElement('button');
    newGame.classList.add('button-new-game');
    newGame.textContent = 'New Game';

    const buttonEasy = document.createElement('button');
    buttonEasy.classList.add('button-level');
    buttonEasy.textContent = 'Easy';
    buttonEasy.addEventListener('click', () => {
      this.easy = true;
      this.medium = false;
      this.hard = false;
      this.changeRound();
      addHiddenClass('hidden', 'letter');
      removeClass('hidden', 'figure');
    });

    const buttonMedium = document.createElement('button');
    buttonMedium.classList.add('button-level');
    buttonMedium.textContent = 'Medium';
    buttonMedium.addEventListener('click', () => {
      this.easy = false;
      this.medium = true;
      this.hard = false;
      this.changeRound();
      addHiddenClass('hidden', 'figure');
      removeClass('hidden', 'letter');
    });

    const buttonHard = document.createElement('button');
    buttonHard.classList.add('button-level');
    buttonHard.textContent = 'Hard';
    buttonHard.addEventListener('click', () => {
      this.easy = false;
      this.medium = false;
      this.hard = true;
      this.changeRound();
      removeClass('hidden', 'letter');
      removeClass('hidden', 'figure');
    });

    wrapperButtons.append(newGame, buttonEasy, buttonMedium, buttonHard);
    bodyElement.append(wrapperButtons);
  }

  createWrapperApp() {
    const bodyElement = document.getElementById('app');
    this.createGreetings();
    this.createLevelButtons();

    const input = document.createElement('input');
    input.classList.add('text-input');
    input.disabled = true;

    const round = document.createElement('p');
    round.classList.add('round');
    round.textContent = `Round: ${this.round}/5`;
    bodyElement.append(round, input);

    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add('keyboard-wrapper');
    keyboardWrapper.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('button')) {
        const input = document.querySelector('.text-input');
        input.value += event.target.textContent;
        event.target.classList.add('active');
        setTimeout(() => {
          event.target.classList.remove('active');
        }, 200);
      }
    });
    bodyElement.append(keyboardWrapper);

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
      for (let i = 0; i < this.currentLetters; i += 1) {
        this.arrayLetters.push(getRandomNumberInRange(0, 9));
      }
      const currentButtons = document.querySelectorAll('.button');
      currentButtons.forEach((button) => {
        if (!button.classList.contains('hidden')) {
          this.tempArray.push(button);
        }
      });
      for (let i = 0; i < this.arrayLetters.length; i += 1) {
        for (let j = 0; j < this.tempArray.length; j += 1) {
          if (
            this.arrayLetters[i].toString() === this.tempArray[j].textContent
          ) {
            setTimeout(() => {
              this.tempArray[j].classList.add('active');

              setTimeout(() => {
                this.tempArray[j].classList.remove('active');
              }, 300);
            }, i * 1000);
          }
        }
      }
      const input = document.querySelector('.text-input');
      document
        .querySelectorAll('.button')
        .forEach((button) => (button.disabled = false));
      input.disabled = false;
      input.focus();
      input.setAttribute('placeholder', 'Enter the answer');
      input.setAttribute('maxlength', '2');
      button.classList.add('hidden');
      console.log(this.arrayLetters, this.tempArray);
    });
    this.keyboardTwo.append(button);
  }

  createSequenceButton() {
    const button = document.createElement('button');
    button.classList.add('sequence-button');
    button.textContent = 'Repeat Sequence';
    this.keyboardTwo.append(button);
  }

  keydownHandler() {
    document.addEventListener('keydown', (event) => {
      const input = document.querySelector('.text-input');
      if (document.activeElement !== input) {
        event.preventDefault();
      }
      const buttons = document.querySelectorAll('.button');
      buttons.forEach((button) => {
        if (button.textContent === event.key && button.disabled === false) {
          button.classList.add('active');
          setTimeout(() => {
            button.classList.remove('active');
          }, 200);
        }
      });
    });
  }
}

const keyboard = new Keyboard();

function initialGame() {
  keyboard.createWrapperApp();
  keyboard.createKeyboardNumbers(buttonNumbers);
  keyboard.createKeyboardLetters(buttonLetters);
  keyboard.createStartButton();
  keyboard.createSequenceButton();
  keyboard.keydownHandler();
}
initialGame();
