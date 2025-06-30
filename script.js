const names = ["5% Discount", "10% Discount", "15% Discount", "20% Discount", "25% Discount"];
const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const winnerPopup = document.getElementById("winnerPopup");
const winnerName = document.getElementById("winnerName");
const restartBtn = document.getElementById("restartBtn");

const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#D67BFF", "#FFA07A", "#FF69B4"];
const sliceAngle = (2 * Math.PI) / names.length;
let angle = 0;
let spinning = false;

function drawWheel() {
  for (let i = 0; i < names.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, i * sliceAngle, (i + 1) * sliceAngle);
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(i * sliceAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(names[i], 220, 10);
    ctx.restore();
  }
}

drawWheel();

spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;

  let spinAngle = Math.random() * 2000 + 2000;
  let currentAngle = 0;

  const spinInterval = setInterval(() => {
    currentAngle += 20;
    angle += (20 * Math.PI) / 180;
    ctx.clearRect(0, 0, 500, 500);
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();

    if (currentAngle >= spinAngle) {
      clearInterval(spinInterval);
      showWinner();
      spinning = false;
    }
  }, 20);
});

function showWinner() {
  let winningIndex = Math.floor(((2 * Math.PI - (angle % (2 * Math.PI))) % (2 * Math.PI)) / sliceAngle);
  winnerName.textContent = names[winningIndex];
  winnerPopup.classList.remove("hidden");
}

restartBtn.addEventListener("click", () => {
  winnerPopup.classList.add("hidden");
});

.hidden {
  display: none;
}
