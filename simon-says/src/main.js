import './styles.scss';
import { buttonNumbers, buttonLetters } from './data';
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
  currentLetters = 2;
  totalButtons = 10;
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
    greetings.textContent = 'Welcome to the game "Simon says"';
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
    newGame.classList.add('button-new-game');
    newGame.textContent = 'New Game';

    const buttonEasy = document.createElement('button');
    buttonEasy.classList.add('button-level', 'easy');
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
    buttonMedium.classList.add('button-level', 'medium');
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
    buttonHard.classList.add('button-level', 'hard');
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
    input.addEventListener('input', (event) => {
      this.handlerToWinOrLose();
    });

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
      button.classList.add('hidden');
      checkCurrentLevel(this.easy, this.medium, this.hard);
      for (let i = 0; i < this.currentLetters; i += 1) {
        this.arrayLetters.push(getRandomNumberInRange(0, 36));
      }
      const currentButtons = document.querySelectorAll('.button');
      currentButtons.forEach((button) => {
        if (!button.classList.contains('hidden')) {
          this.tempArray.push(button);
        }
      });
      console.log(this.arrayLetters, this.tempArray);
      generatePauseBetweenButtons(
        this.arrayLetters,
        this.tempArray,
        this.arrayToShowInConsole,
      );
      setTimeout(() => {
        prepareInputToEnter(false, this.currentLetters);
      }, this.currentLetters * 1000);
    });
    this.keyboardTwo.append(button);
  }

  createSequenceButton() {
    const button = document.createElement('button');
    button.classList.add('sequence-button');
    button.textContent = 'Repeat Sequence';
    button.disabled = true;
    button.addEventListener('click', () => {
      button.disabled = true;
      clearInputFromText();
      generatePauseBetweenButtons(
        this.arrayLetters,
        this.tempArray,
        // this.arrayToShowInConsole,
      );
      setTimeout(() => {
        prepareInputToEnter(false, this.currentLetters, true);
      }, this.currentLetters * 1000);
    });
    this.keyboardTwo.append(button);
  }

  keydownHandler() {
    document.addEventListener('keydown', (event) => {
      forbiddenEditInput(event);
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

  handlerToWinOrLose() {
    const input = document.querySelector('.text-input');
    const letterToCheck = input.value; // то что вводит пользователь например 7589
    const copyArray = this.arrayToShowInConsole; // массив с которым сверяем
    const index = letterToCheck.length; // длина введенного значения
    const letter = letterToCheck[letterToCheck.length - 1]; // последний символ введенного значения
    if (copyArray[index - 1] !== letter) {
      alert('You loose');
    }
    if (letterToCheck === copyArray.join('')) {
      alert('You win');
      this.arrayToShowInConsole.length = 0;
      this.arrayLetters.length = 0;
      this.tempArray.length = 0;
      this.currentLetters += 2;
      this.round += 1;
      clearInputFromText();
      this.changeRound();
      document.querySelector('.start-button').classList.remove('hidden');
      if (this.currentLetters > 10) {
        this.currentLetters = 2;
      }
    }
    console.log(copyArray, letterToCheck);
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

function generatePauseBetweenButtons(arr1, arr2, arr3 = []) {
  for (let i = 0; i < arr1.length; i += 1) {
    for (let j = 0; j < arr2.length; j += 1) {
      if (arr1[i].toString() === arr2[j].textContent) {
        setTimeout(() => {
          arr3.push(arr2[j].textContent);
          arr2[j].classList.add('active');
          setTimeout(() => {
            arr2[j].classList.remove('active');
          }, 300);
        }, i * 1000);
      }
    }
  }
}

function forbiddenEditInput(event) {
  const input = document.querySelector('.text-input');
  if (document.activeElement === input) {
    const cursorPosition = input.selectionStart;
    if (
      (event.key === 'Backspace' && cursorPosition <= input.value.length) ||
      (event.key === 'Delete' && cursorPosition < input.value.length)
    ) {
      event.preventDefault();
    }
    if (cursorPosition < input.value.length && event.key.length === 1) {
      event.preventDefault();
    }
  }
}

function clearInputFromText() {
  const input = document.querySelector('.text-input');
  input.value = '';
}

function prepareInputToEnter(bool, figure, bool2 = false) {
  document.querySelector('.sequence-button').disabled = bool2;
  const input = document.querySelector('.text-input');
  document
    .querySelectorAll('.button')
    .forEach((button) => (button.disabled = bool));
  input.disabled = bool;
  input.focus();
  input.setAttribute('placeholder', 'Enter the answer');
  input.setAttribute('maxlength', figure);
}

function checkCurrentLevel(easy, medium, hard) {
  if (easy) {
    document.querySelector('.easy').disabled = false;
    document.querySelector('.medium').disabled = true;
    document.querySelector('.hard').disabled = true;
  } else if (medium) {
    document.querySelector('.easy').disabled = true;
    document.querySelector('.medium').disabled = false;
    document.querySelector('.hard').disabled = true;
  } else if (hard) {
    document.querySelector('.easy').disabled = true;
    document.querySelector('.medium').disabled = true;
    document.querySelector('.hard').disabled = false;
  }
}
