const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector("#start");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>
  <a href="#" class="again" id="again">Ещё раз?</a>`;
  timeEl.parentNode.classList.add("hide");
  const restartBtn = document.querySelector("#again");
  restartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    location.reload();
  });
}

function createCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.backgroundColor = color;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const hexSymbols = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
  }
  return "#" + color;
}

function win() {
  function kill() {
    const circle = document.querySelector(".circle");
    if (circle) circle.click();
  }
  setInterval(kill, 50);
}
