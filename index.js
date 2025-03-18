const sortButton = document.getElementById('sortButton');
const refreshButton = document.getElementById('refreshButton');
const friendInput = document.getElementById('friendInput');
const friendList = document.getElementById('friendList');
const winnerBanner = document.getElementById('winnerBanner');
let friends = [];

function addFriend() {
  const name = friendInput.value.trim();
  if (name) {
    friends.push(name);
    const li = document.createElement('li');
    li.textContent = name;
    friendList.appendChild(li);
    friendInput.value = '';
  }
}

friendInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addFriend();
  }
});

sortButton.addEventListener('click', () => {
  if (friends.length === 0) {
    alert("Adicione pelo menos um amigo para sortear.");
    return;
  }
  const winnerIndex = Math.floor(Math.random() * friends.length);
  winnerBanner.textContent = `O vencedor é: ${friends[winnerIndex]}!`;
  runConfetti();
});

refreshButton.addEventListener('click', () => {
  friends = [];
  friendList.innerHTML = '';
  winnerBanner.textContent = '';
});

function runConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confettiCount = 150;
  const confetti = [];
  const colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#9C27B0'];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }
  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confettiCount; i++) {
      const c = confetti[i];
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + (c.r / 2), c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + (c.r / 2));
      ctx.stroke();
    }
    update();
  }
  function update() {
    angle += 0.01;
    for (let i = 0; i < confettiCount; i++) {
      const c = confetti[i];
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += (Math.cos(angle + c.d) + 1 + c.r / 2) / 2;
      c.x += Math.sin(angle);
      c.tilt = Math.sin(c.tiltAngle) * 15;
      if (c.y > canvas.height) {
        confetti[i] = {
          x: Math.random() * canvas.width,
          y: -10,
          r: c.r,
          d: c.d,
          color: c.color,
          tilt: c.tilt,
          tiltAngleIncremental: c.tiltAngleIncremental,
          tiltAngle: c.tiltAngle
        };
      }
    }
  }
  let confettiDuration = 5000;
  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    draw();
    if (progress < confettiDuration) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(animate);
}
