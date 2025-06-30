window.onload = function() {
  const names = ["5% Discount", "10% Discount", "15% Discount", "20% Discount", "25% Discount"];
  const wheel = document.getElementById("wheel");
  const ctx = wheel.getContext("2d");
  const spinBtn = document.getElementById("spinBtn");
  const winnerPopup = document.getElementById("winnerPopup");
  const winnerName = document.getElementById("winnerName");
  const restartBtn = document.getElementById("restartBtn");

  const colors = ["#0b1d3a", "#d4af37", "#2c3e50", "#f7e7ce", "#333333"];
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

  function easeOut(t) {
    return t * (2 - t);
  }

  spinBtn.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;

    const totalSpinTime = 4000;
    const start = performance.now();
    const spins = Math.floor(Math.random() * 3) + 3;
    const finalAngle = spins * 2 * Math.PI + Math.random() * 2 * Math.PI;

    function animate(now) {
      let elapsed = now - start;
      let progress = Math.min(elapsed / totalSpinTime, 1);
      let easedProgress = easeOut(progress);
      angle = finalAngle * easedProgress;

      ctx.clearRect(0, 0, 500, 500);
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate(angle);
      ctx.translate(-250, -250);
      drawWheel();
      ctx.restore();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        showWinner();
        spinning = false;
      }
    }

    requestAnimationFrame(animate);
  });

  function showWinner() {
    let normalizedAngle = angle % (2 * Math.PI);
    let winningIndex = Math.floor((names.length - (normalizedAngle / sliceAngle)) % names.length);
    winnerName.textContent = names[winningIndex];
    winnerPopup.classList.remove("hidden");
  }

  restartBtn.addEventListener("click", () => {
    winnerPopup.classList.add("hidden");
  });
};
