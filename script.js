const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Centro del canvas
const cx = canvas.width / 2;
const cy = canvas.height / 2;

// Radio del polígono
const R = 150;
// la funcion dibujarPixel dibuja un pixel en las coordenadas dadas 
// Función de apoyo para dibujar un píxel individual

function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * Soporta todos los octantes (m > 1, m < 0, etc.)
 */
function bresenhamLine(x0, y0, x1, y1, color = "#000000") {

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    // Dirección del incremento
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    /*
    Inicialización del error:
    err representa la diferencia entre la línea ideal (continua)
    y la línea discreta (pixeles)
    */
    let err = dx - dy;

    while (true) {

        drawPixel(ctx, x0, y0, color);

        // Condición de parada
        if (x0 === x1 && y0 === y1) break;

        /*
         Parámetro de decisión
        e2 = 2*err permite decidir el movimiento:

        - Si e2 > -dy → avanzar en x
        - Si e2 < dx  → avanzar en y

        Esto permite cubrir TODOS los octantes sin dividir en casos.
        */
        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;   // Ajuste del error al mover en x
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;   // Ajuste del error al mover en y
            y0 += sy;
        }
    }
}
/**
 * Calcula los vértices de un polígono regular.
 */
function getPolygonVertices(centerX, centerY, sides, radius) {

    let vertices = [];

    /*
    Explicación matemática:
    Un polígono regular se puede generar usando coordenadas polares:

    x = cx + R cos(θ)
    y = cy + R sin(θ)

    donde θ = 2πi / n
    */

    for (let i = 0; i < sides; i++) {

        let angle = (2 * Math.PI * i) / sides;

        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        vertices.push({ x, y });
    }

    return vertices;
}
// Dibuja un polígono conectando sus vértices usando Bresenham 
function drawPolygon(vertices) {
    for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % vertices.length];

        bresenhamLine(v1.x, v1.y, v2.x, v2.y);
    }
}
// window.onload se asegura de que el código se ejecute después de que la página haya cargado completamente 
window.onload = function () {

    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const R = 150;

    // n aleatorio entre 5 y 10
    const n = Math.floor(Math.random() * 6) + 5;

    const vertices = getPolygonVertices(cx, cy, n, R);

    drawPolygon(vertices);
};