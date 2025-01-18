export function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function loopForCheckButtons(easy, medium, hard, array, letters) {
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
