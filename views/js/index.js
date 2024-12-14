const canvas = document.createElement("canvas");
const canvasId = "canvasId";
canvas.setAttribute("id", canvasId);
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const canvasWidth = 1000;
const canvasHeight = canvasWidth;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const game = new Pong();
const renderer = new Renderer(canvas, ctx, game);

renderer.render();
