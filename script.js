const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const resultText = document.getElementById("result");

const segments = [
  "10% OFF",
  "Free Hem",
  "15% OFF",
  "No Win 😢",
  "20% OFF",
];

let deg = 0;

spinBtn.onclick = () => {
  spinBtn.style.pointerEvents = "none";
  resultText.textContent = "";

  const min = 1024;
  const max = 9999;
  const spinDeg = Math.floor(Math.random() * (max - min)) + min;
  deg += spinDeg;

  wheel.style.transform = `rotate(${deg}deg)`;

  setTimeout(() => {
    const actualDeg = deg % 360;
    const segmentAngle = 360 / segments.length;
    const index = Math.floor(((360 - actualDeg + segmentAngle / 2) % 360) / segmentAngle);
    resultText.textContent = `🎉 You got: ${segments[index]} 🎉`;
    spinBtn.style.pointerEvents = "auto";
  }, 4200);
};
