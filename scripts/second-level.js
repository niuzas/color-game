// Global variables
let colors = [];

let startGameBtn = document.querySelector('#start-game-btn');
let gameBoardColors = document.querySelector('.game-board__colors');
let boxes = undefined;
let mainColorBlock = document.querySelector('.game-board__main-color');
let mainCOlorBlockText = document.querySelector('.game-board__main-color__text');
let scoreAmount = document.querySelector('#score-amount');
let timeLeftOutput = document.querySelector('#time-amount');

let mainColor;
let lastMainColor;

let score = 0;

let time = 22000;
let timeUp = false;
let boxesCount = 36;

// Functions

function gameInit() {
  timeLeftOutput.innerText = `${time / 1000} seconds`;
  generateBoxes(boxesCount);
  boxes = document.querySelectorAll('.box');
  setColor();
}

function generateBoxes(count) {
  while (count--) gameBoardColors.innerHTML += '<div class="box"><div id="plusOne">+1</div></div>';
}

function getColorCode() {
  var makeColorCode = '0123456789ABCDEF';
  var code = '#';
  for (var count = 0; count < 6; count++) {
    code = code + makeColorCode[Math.floor(Math.random() * 16)];
  }
  return code;
}
function setColor() {
  let randomNumbArr = [];
  colors = [];
  let x = boxesCount;

  while (x--) {
    colors.push(getColorCode());
  }

  while (randomNumbArr.length < 36) {
    let randomNumb = Math.floor(Math.random() * colors.length);
    if (randomNumbArr.indexOf(randomNumb) === -1) randomNumbArr.push(randomNumb);
  }

  let i = 0;

  Array.from(boxes).forEach((box) => {
    box.style.backgroundColor = colors[randomNumbArr[i]];
    i++;
  });
}

function startGame() {
  setColor();

  startGameBtn.disabled = true;
  score = 0;
  timeUp = false;

  let index = Math.floor(Math.random() * colors.length);
  mainColor = colors[index];
  mainColorBlock.style.backgroundColor = mainColor;
  mainCOlorBlockText.style.color = mainColor;
  mainCOlorBlockText.style.filter = 'invert(1)';
  gameBoardColors.style.filter = 'none';
  mainColorBlock.style.filter = 'none';
  let timeLeft = time / 1000;

  setTimeout(() => {
    timeUp = true;
    startGameBtn.disabled = false;
    gameBoardColors.style.filter = 'sepia()';
    mainColorBlock.style.filter = 'sepia()';
  }, time);

  setInterval(() => {
    if (timeLeft > 0) {
      timeLeftOutput.innerText = `${--timeLeft} seconds`;
    }
  }, 1000);
}

function catchColor(e) {
  if (!timeUp) {
    let currentBoxStyle = getComputedStyle(e.target);
    let mainColorStyle = getComputedStyle(mainColorBlock);

    if (currentBoxStyle.backgroundColor === mainColorStyle.backgroundColor) {
      e.target.animate(
        [
          // keyframes
          { transform: 'translateY(0px)' },
          { transform: 'scale(0.2)' },
          { transform: 'translateY(0px)' },
        ],
        {
          // timing options
          duration: 300,
          iterations: 1,
        }
      );
      e.target.querySelector('#plusOne').animate(
        [
          // keyframes
          { visibility: 'visible' },
          { transform: 'translateY(0px)' },
          { transform: 'translateY(-200px)' },
        ],
        {
          // timing options
          duration: 900,
          iterations: 1,
        }
      );
      score++;
      scoreAmount.innerText = score;
      lastMainColor = mainColorStyle.backgroundColor;
      changeColor();
    }
  }
}

function changeColor() {
  if (!timeUp) {
    let index = Math.floor(Math.random() * colors.length);
    let boxesColors = [];
    // setColor();
    boxes.forEach((box) => {
      let style = getComputedStyle(box);
      boxesColors.push(style.backgroundColor);
    });

    mainColor = boxesColors[index];

    if (mainColor === lastMainColor) {
      changeColor();
    } else {
      mainColorBlock.style.backgroundColor = mainColor;
      mainCOlorBlockText.style.color = mainColor;
    }
  }
}

// Events
document.addEventListener('DOMContentLoaded', gameInit());
startGameBtn.addEventListener('click', startGame);
boxes.forEach((box) => box.addEventListener('click', catchColor));
