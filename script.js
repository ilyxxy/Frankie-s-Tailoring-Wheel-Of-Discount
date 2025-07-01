const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultText = document.getElementById("resultText");

const segments = [
  { label: "5% Discount", color: "#1a1a2e", weight: 5 },
  { label: "10% Discount", color: "#2f3542", weight: 3 },
  { label: "15% Discount", color: "#57606f", weight: 2 },
  { label: "20% Discount", color: "#a4b0be", weight: 1 },
  { label: "25% Discount", color: "#dfe4ea", weight: 0.5 }
];

let angles = [];
let totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);

// Draw Wheel
function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 180;
  let startAngle = 0;

  angles = [];

  segments.forEach((seg) => {
    const sliceAngle = (2 * Math.PI * seg.weight) / totalWeight;
    angles.push({ start: startAngle, end: startAngle + sliceAngle, label: seg.label });

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.save();

    // Draw text
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

  const spinDeg = 360 * 5 + Math.floor(Math.random() * 360);
  currentRotation += spinDeg;

  canvas.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const normalizedRotation = (currentRotation % 360) * Math.PI / 180;
    const landed = angles.find((a) => normalizedRotation >= a.start && normalizedRotation < a.end);
    resultText.textContent = `🎉 You got: ${landed?.label || "Try again!"} 🎉`;
    spinButton.style.pointerEvents = "auto";
  }, 5200);
};
