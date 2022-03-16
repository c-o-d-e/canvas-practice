const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Mouse position object

const mouse = {
  x: undefined,
  y: undefined,
  radius = 150
};
