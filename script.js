const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ctx.fillRect(0, 0, canvas.width, canvas.height); //Fills color to a rectangle

// Mouse position object
const mouse = {
  x: null,
  y: null,
  radius: 150,
};

// Add event listener

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  //   console.log(mouse.x, mouse.y);
});

// Adding Font using CTX
ctx.fillStyle = "black";
ctx.font = "bold 50px Arial";
ctx.wrap;
ctx.fillText("Welcome", 10, 40);

// Get image data for pixel manipulation

//ctx.strokeRect(0, 0, 240, 50); //To check the outline of image being selected
const data = ctx.getImageData(0, 0, 240, 50);

//Creates Class of particles
class Particles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.beginPath(); //to put pencil down to draw
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      this.size = 15;
    } else {
      this.size = 3;
    }
  }
}

let particleArray = []; //All new Particles objects will be stored in an array
//Initialize the Particles class
function init() {
  particleArray = [];
  for (let i = 0; i < 1000; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particles(x, y));
  }
}

init();
console.log(particleArray);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}

animate();
