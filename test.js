let xPaddle = 45;
let xBall = 45;
let yBall = 10;
let yAxis = 0;
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
    if (xBall === 93) {
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
window.addEventListener("deviceorientation", (event) => {
  yAxis = Math.round(event.gamma);

  // document.getElementById("y-axis-info").innerHTML = yAxis;

  // document.getElementById("y-axis-info").innerHTML = ballSpeed;

  if (yAxis > 5) {
    // xPaddle--;
    // if (xPaddle < 0) {
    //   xPaddle = 0;
    // }
    moveRight();
  }
  if (yAxis < -5) {
    // xPaddle++;
    // if (xPaddle > 84) {
    //   xPaddle = 84;
    // }
    moveLeft();
  }
});

function renderLine() {
  document.getElementById("line").style.right = xPaddle + "%";
  document.getElementById("points").innerHTML = `score: ${score}`;

  if (score < 0) {
    xBall = 45;
    yBall = 0;
    document.getElementById("fail").style.display = "block";
  }
  // ballSpeed = 100 - score * 25;
  //service information
  //     document.getElementById("x-ball-info").innerHTML = `xBall = ${xBall} : yBall = ${yBall}`;
  //     document.getElementById("x-paddle-info").innerHTML = `xPaddle = ${xPaddle}`;
  //     console.log(xBall, yBall);
}

//buttons controll
document.getElementById("left").onclick = () => moveLeft();
document.getElementById("right").onclick = () => moveRight();

//keyboard processing
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    moveLeft();
  } else if (event.code === "ArrowRight") {
    moveRight();
  }
});

tiltAvailable();

const ballRenderTime = setInterval(() => renderBall(), ballSpeed);
const renderAll = setInterval(() => renderLine(), 25);
