const backdrop = document.querySelector("#backdrop");
const ball = document.querySelector("#ball");
const line = document.querySelector("#line");
const field = document.querySelector(".field");
const fieldWidht = field.offsetWidth;
const fieldHeight = field.offsetHeight;
document.addEventListener("click", buttonHandling);

let xPaddle = 50;
let xBall = 25;
let yBall = 0;
let score = 0;
let ballSpeed = 0;
let xDirection = true;
let yDirection = true;

function buttonHandling(event) {
  const target = event.target.id;
  switch (target) {
    case "left":
      moveLeft();
      break;
    case "right":
      moveRight();
      break;
    case "info":
      backdrop.classList.remove("is-hidden");
      break;
    case "backdrop":
      backdrop.classList.add("is-hidden");
      break;
  }
}

function moveLeft() {
  xPaddle += 10;
  xPaddle > fieldWidht - 56 ? (xPaddle = fieldWidht - 56) : null;
}
function moveRight() {
  xPaddle -= 10;
  xPaddle < 50 ? (xPaddle = 50) : null;
}

function renderBall() {
  if (xDirection) {
    xBall += ballSpeed;
    if (xBall > fieldWidht - 25) xDirection = !xDirection;
  } else if (!xDirection) {
    xBall -= ballSpeed;
    if (xBall < 25) xDirection = !xDirection;
  }

  if (yDirection) {
    yBall += ballSpeed;

    if (yBall > (fieldHeight / 100) * 70 + 25 && xBall < xPaddle + 50 && xBall > xPaddle - 50) {
      yDirection = !yDirection;
      score += 1;
    }
  }
  if (!yDirection) {
    yBall -= ballSpeed;
    if (yBall < 0) yDirection = !yDirection;
  }

  if (yBall > (fieldHeight / 100) * 85) {
    yBall = 0;
    xBall = Math.round(Math.random() * fieldWidht);
    score -= 1;
  }

  ball.style = `right:${xBall}px; top:${yBall}px;`;
}

function tiltAvailable() {
  let message = "";
  window.DeviceOrientationEvent
    ? (message = "your device support tilt control")
    : (message = "your device don't support tilt control");
  document.getElementById("more-info").innerHTML = message;
}

//accelerometer processing
function tiltProcessing() {
  window.addEventListener("deviceorientation", (event) => {
    let yAxis = Math.round(event.gamma);

    if (yAxis > 5) {
      moveRight();
    } else if (yAxis < -5) {
      moveLeft();
    }
  });
}

function renderLine() {
  line.style.right = xPaddle + "px";
}

function scoreCounter() {
  document.getElementById("points").innerHTML = `score: ${score}`;

  ballSpeed = score + 1;

  if (score < 0) {
    xBall = fieldWidht / 2;
    yBall = 0;
    document.getElementById("fail").style.display = "block";
  }
}

//keyboard processing
function keyboardProcessing() {
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      moveLeft();
    } else if (event.code === "ArrowRight") {
      moveRight();
    }
  });
}

function renderSpeed() {
  const ballRenderTime = setInterval(renderBall, 20);
  const paddleRenderTime = setInterval(renderLine, 25);
  const scoreRenderTime = setInterval(scoreCounter, 25);
}

tiltProcessing();
keyboardProcessing();
tiltAvailable();
renderSpeed();
