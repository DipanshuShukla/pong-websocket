class Renderer {
    constructor(canvas, ctx, game) {
        this.fps = 60;
        this.lastFrameTime = Date.now();
        this.ctx = ctx;
        this.game = game;
        this.canvas = canvas;
        this.posScalerX = canvas.height / game.height;
        this.posScalerY = canvas.width / game.width;

        this.scorePosY = 12;

        this.paddleWidth = 2;

        this.linePosX = this.game.width / 2;
        this.addControls();
    }

    addControls() {
        document.addEventListener("keydown", (event) =>
            this.keydownEventHandler(event)
        );
        document.addEventListener("keyup", (event) =>
            this.keyupEventHandler(event)
        );
    }

    keydownEventHandler(event) {
        if (event.code === "KeyW") {
            this.game.movePaddleUp(1);
        }
        if (event.code === "KeyS") {
            this.game.movePaddleDown(1);
        }
        if (event.code === "ArrowUp") {
            this.game.movePaddleUp(2);
        }
        if (event.code === "ArrowDown") {
            this.game.movePaddleDown(2);
        }
    }

    keyupEventHandler(event) {
        if (event.code === "KeyW") {
            this.game.paddle1VelY === -1 && this.game.stopPaddle(1);
        }
        if (event.code === "KeyS") {
            this.game.paddle1VelY === 1 && this.game.stopPaddle(1);
        }

        if (event.code === "ArrowUp") {
            this.game.paddle2VelY === -1 && this.game.stopPaddle(2);
        }
        if (event.code === "ArrowDown") {
            this.game.paddle2VelY === 1 && this.game.stopPaddle(2);
        }
    }

    render() {
        if (Date.now() - this.lastFrameTime >= 1000 / this.fps) {
            this.clearScreen();
            this.drawBall();
            this.drawPaddles();
            this.drawCenterPartition();
            this.drawScore();
            this.lastFrameTime = Date.now();
        }
        this.game.calculateNextState();
        window.requestAnimationFrame(this.render.bind(this));
    }

    clearScreen() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(
            0,
            0,
            this.game.width * this.posScalerX,
            this.game.height * this.posScalerY
        );
    }

    drawScore() {
        this.ctx.font = "72px serif";
        this.ctx.fillText(
            (this.game.score[0] < 10 ? "0" : "") + this.game.score[0],
            (this.game.width / 2 - 13) * this.posScalerX,
            this.scorePosY * this.posScalerY
        );
        this.ctx.fillText(
            (this.game.score[1] < 10 ? "0" : "") + this.game.score[1],
            (this.game.width / 2 + 5) * this.posScalerX,
            this.scorePosY * this.posScalerY
        );
    }

    drawCenterPartition() {
        this.ctx.strokeStyle = "rgb( 244,172,70 )";
        this.ctx.setLineDash([4 * this.posScalerY, 2 * this.posScalerY]);
        // Start a new Path
        this.ctx.beginPath();
        this.ctx.moveTo(this.linePosX * this.posScalerX, 0);
        this.ctx.lineTo(
            this.linePosX * this.posScalerX,
            this.game.height * this.posScalerY
        );

        // Draw the Path
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    drawBall() {
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(
            this.game.ballPosX * this.posScalerX,
            this.game.ballPosY * this.posScalerY,
            this.game.ballRadius * Math.min(this.posScalerX, this.posScalerY),
            0,
            2 * Math.PI,
            false
        );
        this.ctx.fillStyle = "rgb( 244,172,70 )";
        this.ctx.fill();
    }

    drawPaddles() {
        this.ctx.fillStyle = "rgb( 244,172,70 )";
        this.ctx.fillRect(
            this.game.paddleGap * this.posScalerX,
            (this.game.paddle1Y - this.game.paddleLength / 2) * this.posScalerY,
            this.paddleWidth * this.posScalerX,
            this.game.paddleLength * this.posScalerY
        );

        this.ctx.fillRect(
            (this.game.width - this.game.paddleGap - this.paddleWidth) *
                this.posScalerX,
            (this.game.paddle2Y - this.game.paddleLength / 2) * this.posScalerY,
            this.paddleWidth * this.posScalerX,
            this.game.paddleLength * this.posScalerY
        );
    }
}

if (typeof window !== "undefined") {
    window.Renderer = Renderer;
}
