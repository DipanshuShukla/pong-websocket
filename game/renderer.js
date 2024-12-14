class Renderer {
    constructor(canvas, ctx, game) {
        this.fps = 60;
        this.lastFrameTime = Date.now();
        this.ctx = ctx;
        this.game = game;
        this.canvas = canvas;
        this.posScalerX = canvas.height / game.height;
        this.posScalerY = canvas.width / game.width;
    }

    render() {
        if (Date.now() - this.lastFrameTime >= 1000 / this.fps) {
            this.clearScreen();
            this.drawBall();
            this.lastFrameTime = Date.now();
        }
        this.game.calculateNextState();
        window.requestAnimationFrame(this.render.bind(this));
    }

    clearScreen() {
        console.log(
            this.game.width * this.posScalerX,
            this.game.height * this.posScalerY
        );

        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(
            0,
            0,
            this.game.width * this.posScalerX,
            this.game.height * this.posScalerY
        );
    }

    drawBall() {
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(
            this.game.ballPosX * this.posScalerX,
            this.game.ballPosY * this.posScalerY,
            10,
            0,
            2 * Math.PI,
            false
        );
        this.ctx.fillStyle = "white";
        this.ctx.fill();
    }
}

if (typeof window !== "undefined") {
    window.Renderer = Renderer;
}
