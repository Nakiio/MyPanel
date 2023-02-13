const canvas = document.getElementById("rectlimit");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let startX;
let startY;

canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener("mousemove", e => {
  if (isDrawing) {
    const currentX = e.clientX - canvas.offsetLeft;
    const currentY = e.clientY - canvas.offsetTop;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(startX, startY, currentX - startX, currentY - startY);
  }
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));