export function removeModalWindow() {
  if (document.getElementById('myModal')) {
    document.getElementById('myModal').remove();
  }
}

export function disabledButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => (button.disabled = true));
}

export function disableInput(array) {
  const input = document.querySelector('.text-input');
  input.disabled = true;
  array.forEach((button) => (button.disabled = true));
}

export function prepareForNewGame() {
  const input = document.querySelector('.text-input');
  input.value = '';
  input.disabled = true;
  document.querySelector('.sequence-button').classList.add('hidden');
  document.querySelector('.next-button').classList.add('hidden');
  document.querySelector('.start-button').classList.remove('hidden');
  document.querySelector('.sequence-button').disabled = true;
  document.querySelector('.easy').disabled = false;
  document.querySelector('.medium').disabled = false;
  document.querySelector('.hard').disabled = false;
  document
    .querySelectorAll('.button')
    .forEach((button) => (button.disabled = true));
}

export function getCurrentArrayButtons(array) {
  const currentButtons = document.querySelectorAll('.button');
  currentButtons.forEach((button) => {
    if (!button.classList.contains('hidden')) {
      array.push(button);
    }
  });
}

export function checkForbiddenSymbolsToInput(array) {
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

export function checkCurrentLevel(easy, medium, hard) {
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

export function prepareInputToEnter(bool, figure, bool2 = false) {
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

export function clearInputFromText() {
  const input = document.querySelector('.text-input');
  input.value = '';
}

export function forbiddenEditInput(event) {
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

export function generatePauseBetweenButtons(arr1, arr2, arr3 = []) {
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

export function showElements() {
  document.querySelector('.sequence-button').classList.remove('hidden');
  document.querySelector('.text-input').classList.remove('hidden');
  document.querySelector('.round').classList.remove('hidden');
  document.querySelector('.button-new-game').classList.remove('hidden');
  document.querySelector('.button-new-game').disabled = true;
}
