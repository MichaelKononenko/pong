let xPaddle = 45;
let xBall = 45;
let yBall = 10;
let tiltControl = false;
let yAxis = 0;

let xDirection = true;
let yDirection = true;

function moveLeft() {
  xPaddle += 1;
  renderLine();
}
function moveRight() {
  xPaddle -= 1;
  renderLine();
}
function renderLine() {
  document.getElementById("line").style.right = xPaddle + "%";
}

function renderBall() {
  document.getElementById("x-ball-info").innerHTML = `xBall = ${xBall} : yBall = ${yBall}`;
  document.getElementById("x-paddle-info").innerHTML = `xPaddle = ${xPaddle}`;

  console.log(xBall, yBall);

  if (xDirection) {
    xBall += 1;
    if (xBall === 85) {
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
  }
  if (yBall > 70 && (xBall < xPaddle + 15 || xBall < xPaddle)) {
    yDirection = !yDirection;
  }
  if (!yDirection) {
    yBall -= 1;
    if (yBall === 0) {
      yDirection = !yDirection;
    }
  }

  if (yBall > 85) {
    yBall = 0;
    xBall = 50;
  }

  document.getElementById("ball").style.right = xBall + "%";
  document.getElementById("ball").style.top = yBall + "%";
}

let message = "";
window.DeviceOrientationEvent
  ? (message = "your device support tilt control")
  : (message = "your device don't support tilt control");
document.getElementById("more-info").innerHTML = message;

window.addEventListener("deviceorientation", (event) => {
  yAxis = Math.round(event.gamma);
  xPaddle = yAxis * 5;

  if (yAxis > 10) {
    xPaddle--;
  } else if (yAxis < -10) {
    xPaddle++;
  }
  renderLine();
});

let some = setInterval(() => renderBall(), 50);

document.getElementById("left").onclick = () => moveLeft();
document.getElementById("right").onclick = () => moveRight();

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft") {
    moveLeft();
  } else if (event.code === "ArrowRight") {
    moveRight();
  }
});
