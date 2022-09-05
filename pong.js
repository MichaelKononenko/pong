let xPaddle = 45;
let xBall = 45;
let yBall = 10;
let score = 0;
let ballSpeed = 50;
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
    xBall += 1;
    if (xBall === 90) {
      xDirection = !xDirection;
    }
  }
  if (!xDirection) {
    xBall -= 1;
    if (xBall === 0) {
      xDirection = !xDirection;
    }
  }

  if (yDirection) {
    yBall += 1;
    if (yBall > 70 && xBall < xPaddle + 10 && xBall > xPaddle - 10) {
      yDirection = !yDirection;
      score += 1;
    }
  }
  if (!yDirection) {
    yBall -= 1;
    if (yBall < 10) {
      yDirection = !yDirection;
    }
  }

  if (yBall > 85) {
    yBall = 0;
    xBall = 45;
    score -= 1;
  }

  document.getElementById("ball").style.right = xBall + "%";
  document.getElementById("ball").style.top = yBall + "%";
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
  document.getElementById("points").innerHTML = `score: ${score}`;

  if (score < 0) {
    xBall = 45;
    yBall = 0;
    document.getElementById("fail").style.display = "block";
  }
}

//buttons controll
function buttonsProcessing() {
  document.getElementById("left").onclick = () => moveLeft();
  document.getElementById("right").onclick = () => moveRight();
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
  const ballRenderTime = setInterval(() => renderBall(), 50);
  const paddleRenderTime = setInterval(() => renderLine(), 25);
}

tiltProcessing();
buttonsProcessing();
keyboardProcessing();
tiltAvailable();
renderSpeed();
