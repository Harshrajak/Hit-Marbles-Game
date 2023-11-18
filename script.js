var timer = 60;
var score = 0;
var hitrandom = 0;
var wrongClickCount = 0;

function startGame() {
  var startButton = document.querySelector(".startbtn");

  startButton.addEventListener("click", function () {
    var overlay = document.querySelector(".start-overlay");
    overlay.classList.add("hide");
    setTimer();
    makeBubble();
    getNewHit();
  });
} startGame();

function restartGame() {
  var restartButton = document.querySelector(".endbtn");

  restartButton.addEventListener("click", function () {
    var overlay = document.querySelector(".end-overlay");
    overlay.classList.remove("expose");
    resetCross();
    timer = 60;
    resetScore();
    wrongClickCount = 0;
    makeBubble();
    getNewHit();
  });
} restartGame();

function gameOver() {
  var endOverlay = document.querySelector(".end-overlay");
  endOverlay.classList.add("expose");
  var finalscore = document.querySelector("#scorevalue").textContent;
  document.querySelector("#digit").textContent = finalscore;
}

function getNewHit() {
  hitrandom = Math.floor(Math.random() * 10);
  document.querySelector("#pressvalue").textContent = hitrandom;
} getNewHit();

function utilityFunction() {
  var panelbottom = document.querySelector(".panelbottom");
  panelbottom.addEventListener("click", function (details) {
    var clickedNumber = Number(details.target.textContent);
    if (clickedNumber === hitrandom) {
      updateScore();
      getNewHit();
      makeBubble();
    } else {
      getNewHit();
      makeBubble();

      var cross1 = document.querySelector("#cross1");
      var cross2 = document.querySelector("#cross2");
      var cross3 = document.querySelector("#cross3");

      wrongClickCount++;

      if (wrongClickCount === 1) {
        cross1.classList.add("active");
      } else if (wrongClickCount === 2) {
        cross2.classList.add("active");
      } else if (wrongClickCount === 3) {
        cross3.classList.add("active");
        setTimeout(() => {
          timer = 0;
          gameOver();
          return;
        }, 1000);
      }
    }
  });
} utilityFunction();

function makeBubble() {
  var clutter = "";
  for (var i = 1; i <= 119; i++) {
    var randomValue = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${randomValue}</div>`;
  }
  document.querySelector(".panelbottom").innerHTML = clutter;
} makeBubble();

function updateScore() {
  score += 10;
  document.querySelector("#scorevalue").textContent = score;
}

function setTimer() {
  setInterval(() => {
    if (timer === 0) {
      clearInterval();
      gameOver();
    }

    if (timer > 0) {
      timer--;
      document.querySelector("#timervalue").innerHTML = timer;
    } else {
      clearInterval();
      gameOver();
    }
  }, 1000);
}

function resetScore() {
  score = 0;
  document.querySelector("#scorevalue").textContent = score;
}

function resetCross() {
  var cross1 = document.querySelector("#cross1");
  var cross2 = document.querySelector("#cross2");
  var cross3 = document.querySelector("#cross3");

  cross1.classList.remove("active");
  cross2.classList.remove("active");
  cross3.classList.remove("active");
}