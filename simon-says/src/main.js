import '@/styles.scss';
import { buttonNumbers, buttonLetters } from './data';
import removeClass from './modules/removeClass';
import addHiddenClass from './modules/addClass';
import { getRandomNumberInRange } from './modules/generateRandomNum';

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
    newGame.classList.add('button-level', 'button-new-game');
    newGame.textContent = 'New Game';
    newGame.addEventListener('click', () => {
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
      this.changeRound();
      addHiddenClass('hidden', 'letter');
      removeClass('hidden', 'figure');
    });

    const buttonMedium = document.createElement('button');
    buttonMedium.classList.add('button-level', 'medium');
    buttonMedium.textContent = 'Medium';
    buttonMedium.addEventListener('click', () => {
      disabledButtons();
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
      disabledButtons();
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
      document.querySelector('.button-new-game').disabled = true;
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

  createSequenceButton() {
    const button = document.createElement('button');
    const input = document.querySelector('.text-input');
    button.classList.add('sequence-button');
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
      document.querySelector('.button-new-game').disabled = true;
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
    const letterToCheck = input.value;
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
      input.disabled = true;
      tempArray.forEach((button) => (button.disabled = true));
      return;
    }

    if (letterToCheck === copyArray.join('')) {
      this.round += 1;
      this.attempts = 0;
      if (this.round > 5) {
        modalResponses('You are the Champion! Game Over.', true);
        this.round = 1;
        document.querySelector('.next-button').classList.add('hidden');
        document.querySelector('.sequence-button').classList.remove('hidden');
        document.querySelector('.sequence-button').disabled = true;
      } else {
        modalResponses('You win this round', true);
        tempArray.forEach((button) => (button.disabled = true));
        input.disabled = true;
        arrayToShowInConsole.length = 0;
        this.arrayLetters.length = 0;
        tempArray.length = 0;
        this.currentLetters += 2;
        clearInputFromText();
        this.changeRound();
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

function generatePauseBetweenButtons(arr1, arr2, arr3 = []) {
  for (let i = 0; i < arr1.length; i += 1) {
    for (let j = 0; j < arr2.length; j += 1) {
      let symbol = arr1[i];
      if (typeof symbol === 'number' && symbol > 9) {
        symbol = String.fromCharCode(symbol + 55);
      }
      if (
        symbol.toString().toUpperCase() === arr2[j].textContent.toUpperCase()
      ) {
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

function loopForCheckButtons(easy, medium, hard, array, letters) {
  for (let i = 0; i < letters; i += 1) {
    let randomIndex;
    if (easy) {
      randomIndex = getRandomNumberInRange(0, 9);
    } else if (medium) {
      randomIndex = getRandomNumberInRange(10, 35);
      if (randomIndex > 9) {
        randomIndex = String.fromCharCode(randomIndex + 55);
      }
    } else if (hard) {
      randomIndex = getRandomNumberInRange(0, 35);
      if (randomIndex > 9) {
        randomIndex = String.fromCharCode(randomIndex + 55);
      }
    }
    array.push(randomIndex);
  }
}

function checkForbiddenSymbolsToInput(array) {
  const input = document.querySelector('.text-input');
  const value = input.value;
  let isValid = true;
  for (let i = 0; i < value.length; i++) {
    const char = value.charAt(i).toUpperCase();
    const isCharValid = array.some(
      (letter) => letter.textContent.toUpperCase() === char,
    );
    if (!isCharValid) {
      isValid = false;
      break;
    }
  }
  if (!isValid) {
    input.value = value.slice(0, -1);
  }
}

function getCurrentArrayButtons(array) {
  const currentButtons = document.querySelectorAll('.button');
  currentButtons.forEach((button) => {
    if (!button.classList.contains('hidden')) {
      array.push(button);
    }
  });
}

function prepareForNewGame() {
  const input = document.querySelector('.text-input');
  input.value = '';
  input.disabled = true;
  document.querySelector('.next-button').classList.add('hidden');
  document.querySelector('.start-button').classList.remove('hidden');
  document.querySelector('.sequence-button').classList.remove('hidden');
  document.querySelector('.sequence-button').disabled = true;
  document.querySelector('.easy').disabled = false;
  document.querySelector('.medium').disabled = false;
  document.querySelector('.hard').disabled = false;
  document
    .querySelectorAll('.button')
    .forEach((button) => (button.disabled = true));
}

function modalResponses(res, withTimeout = false) {
  const body = document.body;

  const modal = document.createElement('div');
  modal.setAttribute('id', 'myModal');
  modal.classList.add('modal');
  modal.style.display = 'block';

  const content = document.createElement('div');
  content.classList.add('modal-content');

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const message = document.createElement('p');
  message.classList.add('content-message');
  message.textContent = res;

  const span = document.createElement('span');
  span.classList.add('close');
  span.innerHTML = '&times;';
  span.addEventListener('click', function () {
    modal.remove();
  });

  modalBody.append(message, span);
  content.append(modalBody);
  modal.append(content);
  body.append(modal);

  if (withTimeout) {
    setTimeout(() => {
      modal.remove();
    }, 3000);
  }
  return body;
}

function removeModalWindow() {
  if (document.getElementById('myModal')) {
    document.getElementById('myModal').remove();
  }
}

function disabledButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => (button.disabled = true));
}
