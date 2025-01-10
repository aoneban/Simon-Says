import './styles.scss';
import { buttonNumbers, buttonLetters } from './data';

class Keyboard {
  round = 1;

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

    const buttonMedium = document.createElement('button');
    buttonMedium.classList.add('button-level');
    buttonMedium.textContent = 'Medium';

    const buttonHard = document.createElement('button');
    buttonHard.classList.add('button-level');
    buttonHard.textContent = 'Hard';

    wrapperButtons.append(newGame, buttonEasy, buttonMedium, buttonHard);
    bodyElement.append(wrapperButtons);
  }

  createWrapperApp() {
    const bodyElement = document.getElementById('app');
    this.createGreetings();
    this.createLevelButtons();

    const input = document.createElement('input');
    input.classList.add('text-input');

    const round = document.createElement('p');
    round.classList.add('round');
    round.textContent = `Round: ${this.round}/5`;
    bodyElement.append(round, input);

    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add('keyboard-wrapper');
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
      button.classList.add('button');
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
        button.classList.add('button');
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
    this.keyboardTwo.append(button);
  }

  createSequenceButton() {
    const button = document.createElement('button');
    button.classList.add('sequence-button');
    button.textContent = 'Repeat Sequence';
    this.keyboardTwo.append(button);
  }
}

const keyboard = new Keyboard();
keyboard.createWrapperApp();
keyboard.createKeyboardNumbers(buttonNumbers);
keyboard.createKeyboardLetters(buttonLetters);
keyboard.createStartButton();
keyboard.createSequenceButton();
