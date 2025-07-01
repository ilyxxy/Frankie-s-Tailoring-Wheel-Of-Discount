const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultText = document.getElementById("resultText");
const popup = document.getElementById("popup");
const popupPrize = document.getElementById("popupPrize");
const spinAgainBtn = document.getElementById("spinAgainBtn");

const segments = [
  { label: "5% Discount", color: "#1a1a2e", weight: 5 },
  { label: "10% Discount", color: "#2f3542", weight: 3 },
  { label: "15% Discount", color: "#57606f", weight: 2 },
  { label: "20% Discount", color: "#a4b0be", weight: 1 },
  { label: "25% Discount", color: "#dfe4ea", weight: 0.5 }
];

const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);
let angles = [];

function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 220;
  let startAngle = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  angles = [];

  segments.forEach((seg) => {
    const sliceAngle = (2 * Math.PI * seg.weight) / totalWeight;
    const endAngle = startAngle + sliceAngle;

    angles.push({
      startDeg: (startAngle * 180) / Math.PI,
      endDeg: (endAngle * 180) / Math.PI,
      label: seg.label,
    });

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = seg.color;
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 5;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(seg.label, radius - 10, 10);
    ctx.restore();

    startAngle += sliceAngle;
  });
}

drawWheel();

let currentRotation = 0;

spinButton.onclick = () => {
  spinButton.style.pointerEvents = "none";
  resultText.textContent = "";
  popup.classList.add("hidden");

  const extraRotation = 360 * 5 + Math.floor(Math.random() * 360);
  currentRotation += extraRotation;

  canvas.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const normalized = (360 - (currentRotation % 360)) % 360;

    let angleSum = 0;
    for (let i = 0; i < segments.length; i++) {
      const segDeg = (segments[i].weight / totalWeight) * 360;
      if (normalized >= angleSum && normalized < angleSum + segDeg) {
        const result = segments[i].label;
        resultText.textContent = `🎉 You got: ${result} 🎉`;
        popupPrize.textContent = result;
        popup.classList.remove("hidden");
        break;
      }
      angleSum += segDeg;
    }

    spinButton.style.pointerEvents = "auto";
  }, 5200);
};

spinAgainBtn.onclick = () => {
  popup.classList.add("hidden");
  resultText.textContent = "";
};
