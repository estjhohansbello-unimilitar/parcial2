const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Centro del canvas
const cx = canvas.width / 2;
const cy = canvas.height / 2;

// Radio del polígono
const R = 150;

function dibujarPixel(x, y) {
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
}