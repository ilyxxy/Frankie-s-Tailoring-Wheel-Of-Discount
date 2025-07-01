const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultText = document.getElementById("resultText");
const popup = document.getElementById("popup");
const popupPrize = document.getElementById("popupPrize");
const spinAgainBtn = document.getElementById("spinAgainBtn");
const continueButton = document.getElementById("continueButton");
const formSection = document.getElementById("formSection");
const wheelSection = document.getElementById("wheelSection");

continueButton.onclick = () => {
  formSection.classList.add("hidden");
  wheelSection.classList.remove("hidden");
};

const segments = [
  { label: "5% Discount", color: "#1a1a2e", weight: 5 },
  { label: "10% Discount", color: "#2f3542", weight: 3 },
  { label: "15% Discount", color: "#57606f", weight: 2 },
  { label: "20% Discount", color: "#a4b0be", weight: 1 },
  { label: "25% Discount", color: "#dfe4ea", weight: 0.5 }
];

const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);
const numSegments = segments.length;
const sliceAngle = (2 * Math.PI) / numSegments;

function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 220;
  let startAngle = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  segments.forEach((seg, i) => {
    const endAngle = startAngle + sliceAngle;

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

function pickWeightedSegment() {
  const rand = Math.random() * totalWeight;
  let sum = 0;
  for (let i = 0; i < segments.length; i++) {
    sum += segments[i].weight;
    if (rand < sum) return i;
  }
  return segments.length - 1;
}

spinButton.onclick = () => {
  spinButton.style.pointerEvents = "none";
  resultText.textContent = "";
  popup.classList.add("hidden");

  const pickedIndex = pickWeightedSegment();
  const segmentRotation = 360 / segments.length;
  const stopAngle = 360 - (pickedIndex * segmentRotation + segmentRotation / 2);
  const extraRotation = 360 * 5;
  currentRotation += extraRotation + stopAngle;

  canvas.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const result = segments[pickedIndex].label;
    resultText.textContent = `🎉 You got: ${result} 🎉`;
    popupPrize.textContent = result;
    popup.classList.remove("hidden");

    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    spinButton.style.pointerEvents = "auto";
  }, 5200);
};

spinAgainBtn.onclick = () => {
  popup.classList.add("hidden");
  resultText.textContent = "";
};
