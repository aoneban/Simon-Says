import './styles.scss';

const buttonNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const buttonLetters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

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
    this.keyboardOne.classList.add('keyboard');
    keyboardWrapper.append(this.keyboardOne);

    this.keyboardTwo = document.createElement('div');
    this.keyboardTwo.classList.add('keyboard-2');
    keyboardWrapper.append(this.keyboardTwo);

    const paragraph1 = document.createElement('p');
    paragraph1.append('Клавиатура создана в операционной системе iOS');
    bodyElement.append(paragraph1);
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
}

const keyboard = new Keyboard();
keyboard.createWrapperApp();
keyboard.createKeyboardNumbers(buttonNumbers);
keyboard.createKeyboardLetters(buttonLetters);
