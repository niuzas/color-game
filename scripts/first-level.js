// Global variables
let colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#0096c7", "#f10074", "#283618", "#000866"];

let startGameBtn = document.querySelector("#start-game-btn");
let boxes = document.querySelectorAll(".box");
let mainColorBlock = document.querySelector(".game-board__main-color");
let scoreAmount = document.querySelector("#score-amount");
let timeLeftOutput = document.querySelector("#time-amount");

let mainColor;
let lastMainColor;

let score = 0;

let time = 15000;
let timeUp = false;


// Functions
function setColor() {
    let randomNumbArr = [];

    while(randomNumbArr.length < 9){
        let randomNumb = Math.floor(Math.random() * colors.length);
        if(randomNumbArr.indexOf(randomNumb) === -1) randomNumbArr.push(randomNumb);
    }
    
    let i = 0;
    
    Array.from(boxes).forEach(box => {
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
    
    let timeLeft = time / 1000;

    setTimeout(() => {
        timeUp = true;
        startGameBtn.disabled = false;
    }, time);

    setInterval(() => {
        if(timeLeft > 0) {
            timeLeftOutput.innerText = `${--timeLeft} seconds`;
        }
    }, 1000);
}

function catchColor(e) {
    if(!timeUp) {
        let currentBoxStyle = getComputedStyle(e.target);
        let mainColorStyle = getComputedStyle(mainColorBlock);
        
        if(currentBoxStyle.backgroundColor === mainColorStyle.backgroundColor) {
            score++
            scoreAmount.innerText = score;
            lastMainColor = mainColorStyle.backgroundColor;
            changeColor();
        }
    }
}

function changeColor() {
    if(!timeUp) {
        let index = Math.floor(Math.random() * colors.length);
        let boxesColors = [];
        
        boxes.forEach(box => {
            let style = getComputedStyle(box);
            boxesColors.push(style.backgroundColor);
        });
        
        mainColor = boxesColors[index];

        if(mainColor === lastMainColor) {
            changeColor();
        } else {
            mainColorBlock.style.backgroundColor = mainColor;
        }
    }
}

// Events
document.addEventListener("DOMContentLoaded", setColor);
startGameBtn.addEventListener("click", startGame);
boxes.forEach(box => box.addEventListener("click", catchColor))



