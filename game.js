const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fruits = [];
let score = 0;
const scoreDiv = document.getElementById("score");

const fruitImg = new Image();
fruitImg.src = "https://i.imgur.com/2yaf2wb.png"; // Fruit PNG

class Fruit {
  constructor(x, y, speedY) {
    this.x = x;
    this.y = y;
    this.radius = 40;
    this.speedY = speedY;
    this.gravity = 0.4;
    this.isSliced = false;
  }

  update() {
    this.y -= this.speedY;
    this.speedY -= this.gravity;
  }

  draw() {
    if (!this.isSliced) {
      ctx.drawImage(fruitImg, this.x - this.radius, this.y - this.radius, 80, 80);
    }
  }
}

function spawnFruit() {
  const x = Math.random() * canvas.width;
  const speedY = Math.random() * 7 + 12;
  fruits.push(new Fruit(x, canvas.height, speedY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fruits.forEach((fruit, index) => {
    fruit.update();
    fruit.draw();
    if (fruit.y > canvas.height || fruit.y < -100) {
      fruits.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (e) => {
  sliceAt(e.clientX, e.clientY);
});

canvas.addEventListener("touchmove", (e) => {
  let touch = e.touches[0];
  sliceAt(touch.clientX, touch.clientY);
});

function sliceAt(mx, my) {
  fruits.forEach((fruit, i) => {
    const dx = fruit.x - mx;
    const dy = fruit.y - my;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < fruit.radius && !fruit.isSliced) {
      fruit.isSliced = true;
      score += 1;
      scoreDiv.textContent = "Score: " + score;
    }
  });
}

setInterval(spawnFruit, 900);
animate();