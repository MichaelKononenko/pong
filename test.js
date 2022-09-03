let xPaddle = 45;
let xBall = 45;
let yBall = 10;

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
  document.getElementById("x-paddle-info").innerHTML = `xBall = ${xBall} : yBall = ${yBall}`;

  console.log(xBall, yBall);
  if (xDirection) {
    xBall += 1;
    if (xBall === 95) {
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
  if (xPaddle < xBall + 10 && xPaddle === xBall && yBall > 75) {
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

let some = setInterval(() => renderBall(), 100);

document.getElementById("left").onclick = () => moveLeft();
document.getElementById("right").onclick = () => moveRight();

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft") {
    moveLeft();
  } else if (event.code === "ArrowRight") {
    moveRight();
  }
});

if (window.DeviceOrientationEvent) {
  document.getElementById("more-info").innerHTML = "true";
} else document.getElementById("more-info").innerHTML = "false";

window.addEventListener("deviceorientation", (event) => {
  yAxis = Math.round(event.gamma);
  document.getElementById("log-info").innerHTML = `y = ${yAxis}`;
  xPaddle = yAxis * 5;

  if (xPaddle > 10) {
    xPaddle++;
  }
  if (yAxis < -10) {
    xPaddle--;
  }
  renderLine();
});
