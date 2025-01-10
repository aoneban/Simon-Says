import './styles.scss';
import { buttonNumbers, buttonLetters } from './data';

class Keyboard {
  constructor(arr) {
    this.arr = arr;
    this.keyboardOne = null;
    this.keyboardTwo = null;
  }

  createWrapperApp() {
    const bodyElement = document.getElementById('app');

    const input = document.createElement('input');
    input.classList.add('text-input');
    bodyElement.append(input);

    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add('keyboard-wrapper');
    bodyElement.append(keyboardWrapper);

    this.keyboardOne = document.createElement('div');
    this.keyboardOne.classList.add('keyboard-one');
    keyboardWrapper.append(this.keyboardOne);

    this.keyboardTwo = document.createElement('div');
    this.keyboardTwo.classList.add('keyboard-two');
    keyboardWrapper.append(this.keyboardTwo);
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
