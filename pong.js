let xPaddle = 45;
let xBall = 450;
let yBall = 10;
let score = 0;
let ballSpeed = 0;
let xDirection = true;
let yDirection = true;

function moveLeft() {
  xPaddle += 1;

  if (xPaddle > 84) {
    xPaddle = 84;
  }
}
function moveRight() {
  xPaddle -= 1;

  if (xPaddle < 0) {
    xPaddle = 0;
  }
}

function renderBall() {
  if (xDirection) {
    xBall += ballSpeed;

    if (xBall > 900) {
      xDirection = !xDirection;
    }
  }
  if (!xDirection) {
    xBall -= ballSpeed;

    if (xBall < 0) {
      xDirection = !xDirection;
    }
  }

  if (yDirection) {
    yBall += ballSpeed;

    if (yBall / 10 > 70 && xBall / 10 < xPaddle + 10 && xBall / 10 > xPaddle - 10) {
      yDirection = !yDirection;
      score += 1;
    }
  }
  if (!yDirection) {
    yBall -= ballSpeed;

    if (yBall < 10) {
      yDirection = !yDirection;
    }
  }

  if (yBall > 850) {
    yBall = 0;
    xBall = 45;
    score -= 1;
  }

  document.getElementById("ball").style.right = xBall / 10 + "%";
  document.getElementById("ball").style.top = yBall / 10 + "%";
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
  document.getElementById("line").style.right = xPaddle + "%";
}

function scoreCounter() {
  document.getElementById("points").innerHTML = `score: ${score}`;

  ballSpeed = score + 1;

  if (score < 0) {
    xBall = 45;
    yBall = 0;
    document.getElementById("fail").style.display = "block";
  }
}

//buttons controll
function buttonsProcessing() {
  document.getElementById("left").onclick = moveLeft;
  document.getElementById("right").onclick = moveRight;
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

setInterval(tiltProcessing, 50);
buttonsProcessing();
keyboardProcessing();
tiltAvailable();
renderSpeed();
