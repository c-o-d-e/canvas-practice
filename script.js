const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ctx.fillRect(0, 0, canvas.width, canvas.height); //Fills color to a rectangle

//REsizing Canvas

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Mouse position object
const mouse = {
  x: null,
  y: null,
  radius: 70,
};

// Add event listener

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Adding Font using CTX
ctx.fillStyle = "black";
ctx.font = "bold 15px Arial";
ctx.fillText("Welcome", 45, 35);

// Get image data for pixel manipulation

// ctx.strokeRect(30, 10, 100, 30); //To check the outline of image being selected
const textCoordinates = ctx.getImageData(30, 10, 100, 30);

//Creates class of particles
class Particles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.beginPath(); //to put pencil down to draw
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x; //Distance between mouse pointer and the particle in x direction
    let dy = mouse.y - this.y; //Distance between mouse pointer and the particle in y direction
    let distance = Math.sqrt(dx * dx + dy * dy); //Direct distance between mouse pointer and the particle using hypotenuse
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX / 10;
      this.y -= directionY / 10;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 5;
      }

      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 5;
      }
    }
  }
}

let particleArray = []; //All new Particles objects will be stored in an array
//Initialize the Particles class
function init() {
  particleArray = [];
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let positionX = x;
        let positionY = y;
        particleArray.push(new Particles(positionX * 15, positionY * 15));
      }
    }
  }
}

init();
// console.log(particleArray);

function animate() {
  window.addEventListener("resize", resizeCanvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}

animate();

//Connecting line between particles
function connect() {
  let opacityValue = 1;
  for (let outer = 0; outer < particleArray.length; outer++) {
    for (let inner = outer; inner < particleArray.length; inner++) {
      let dx = particleArray[outer].x - particleArray[inner].x;
      let dy = particleArray[outer].y - particleArray[inner].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 30) {
        opacityValue = 1 - distance / 30;
        ctx.strokeStyle = "rgba(0,0,0, " + opacityValue + ")";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particleArray[outer].x, particleArray[outer].y);
        ctx.lineTo(particleArray[inner].x, particleArray[inner].y);
        ctx.stroke();
      }
    }
  }
}
