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
  console.log(xBall, yBall);
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
  }
  if (xPaddle < xBall + 10 && yBall > 70) {
    yDirection = !yDirection;
  }
  if (!yDirection) {
    yBall -= 1;
    if (yBall === 5) {
      yDirection = !yDirection;
    }
  }

  if (yBall > 80) {
    yBall = 10;
    xBall = 50;
  }

  document.getElementById("ball").style.right = xBall + "%";
  document.getElementById("ball").style.top = yBall + "%";
}

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

if (window.DeviceOrientationEvent) {
  document.getElementById("more-info").innerHTML = "true";
} else document.getElementById("more-info").innerHTML = "false";

window.addEventListener("deviceorientation", (event) => {
  yAxis = Math.round(event.gamma);
  document.getElementById("log-info").innerHTML = `y = ${yAxis}`;
  xPaddle = yAxis * 5;
  if (xPaddle > 5) {
    xPaddle--;
  }
  if (yAxis < -5) {
    xPaddle++;
  }
  renderLine();
});
