// Variables globales
let canvas, ctx;

// Función para dibujar un pixel
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

// Bresenham (todos los octantes)
function bresenhamLine(x0, y0, x1, y1, color = "#000000") {

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    while (true) {

        drawPixel(ctx, x0, y0, color);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}
// Obtener vértices del polígono regular (ya devuelve enteros)
// se corrigieron los cálculos para que devuelva enteros, evitando problemas con el algoritmo de Bresenham
function getPolygonVertices(centerX, centerY, sides, radius) {

    let vertices = [];

    for (let i = 0; i < sides; i++) {

        let angle = (2 * Math.PI * i) / sides;

        let x = Math.round(centerX + radius * Math.cos(angle));
        let y = Math.round(centerY + radius * Math.sin(angle));

        vertices.push({ x, y });
    }

    return vertices;
}

// Dibujar polígono (ya recibe enteros)
function drawPolygon(vertices) {
    for (let i = 0; i < vertices.length; i++) {

        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % vertices.length];

        bresenhamLine(v1.x, v1.y, v2.x, v2.y);
    }
}

// Generar figura
function generarFigura() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const R = 150;

    const n = Math.floor(Math.random() * 6) + 5;

    console.log("Lados:", n);
    const vertices = getPolygonVertices(cx, cy, n, R);

    const vertices = getPolygonVertices(cx, cy, n, R);

    drawPolygon(vertices);
    
    // Dibuja círculos en los vértices del polígono con un radio de R/4
    drawCirclesAtVertices(vertices, R);
}

// Ejecutar al cargar ya que el canvas cargaba antes que el html
window.onload = function () {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    generarFigura();
};
/**
 * Dibuja una circunferencia usando el algoritmo del punto medio
 * (Bresenham para circunferencias)
 */
function drawCircle(cx, cy, r, color = "#000000") {

    let x = 0;
    let y = r;

    /*
     Parámetro de decisión:
    p determina si el siguiente punto está dentro o fuera del círculo
    */
    let p = 1 - r;

    while (x <= y) {

        // Simetría en los 8 octantes
        drawPixel(ctx, cx + x, cy + y, color);
        drawPixel(ctx, cx - x, cy + y, color);
        drawPixel(ctx, cx + x, cy - y, color);
        drawPixel(ctx, cx - x, cy - y, color);

        drawPixel(ctx, cx + y, cy + x, color);
        drawPixel(ctx, cx - y, cy + x, color);
        drawPixel(ctx, cx + y, cy - x, color);
        drawPixel(ctx, cx - y, cy - x, color);

        x++;

        if (p < 0) {
            // Punto medio dentro del círculo
            p += 2 * x + 1;
        } else {
            // Punto medio fuera del círculo
            y--;
            p += 2 * (x - y) + 1;
        }
    }
}
// Dibuja círculos en los vértices del polígono con un radio de R/4  
function drawCirclesAtVertices(vertices, R) {

    const r = Math.round(R / 4); // radio solicitado

    vertices.forEach(v => {
        drawCircle(v.x, v.y, r);
    });
}
