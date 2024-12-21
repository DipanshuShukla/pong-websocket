class Pong {
    constructor() {
        this.gameRate = 90;

        this.width = 100;
        this.height = this.width;

        this.paddleSpeed = 0.5;
        this.paddleLength = 15;
        this.paddleGap = 2;

        this.paddle1Y = this.height / 2;
        this.paddle2Y = this.height / 2;
        this.paddle1VelY = 0;
        this.paddle2VelY = 0;

        this.ballStartVel = 0.4;
        this.ballMaxVel = 1;
        this.ballVelIncreaseFactor = 1000;
        this.ballRadius = 1.4;

        this.score = [0, 0];

        this.gameInit();
    }

    gameInit() {
        this.lastGameTime = Date.now();

        this.ballPosX = this.width / 2;
        this.ballPosY = this.height / 2;

        this.ballVelX = this.ballStartVel * (Math.random() <= 0.5 ? -1 : 1);
        this.ballVelY = Math.random() * this.ballMaxVel * 2 - this.ballMaxVel;
    }

    newGame() {
        this.gameInit();
    }

    getGameState() {
        return {
            height: this.height,
            width: this.width,

            ballPosX: this.ballPosX,
            ballPosY: this.ballPosY,
            ballVelX: this.ballVelX,
            ballVelY: this.ballVelY,

            paddle1Y: this.paddle1Y,
            paddle2Y: this.paddle2Y,

            paddleSpeed: this.paddleSpeed,
            paddleLength: this.paddleLength,
            paddleGap: this.paddleGap,

            ballRadius: this.ballRadius,
        };
    }

    setGameState({
        ballPosX,
        ballPosY,
        ballVelX,
        ballVelY,

        paddle1Y,
        paddle2Y,
    }) {
        ballPosX && (this.ballPosX = ballPosX),
            ballPosY && (this.ballPosY = ballPosY),
            ballVelX && (this.ballVelX = ballVelX),
            ballVelY && (this.ballVelY = ballVelY),
            paddle1Y && (this.paddle1Y = paddle1Y),
            paddle2Y && (this.paddle2Y = paddle2Y);
    }

    calculateNextState() {
        if (Date.now() - this.lastGameTime >= 1000 / this.gameRate) {
            this.moveBall();
            this.increaseBallVelX();
            this.movePaddle();
            this.lastGameTime = Date.now();
        }
    }

    increaseBallVelX() {
        // this.ballVelX < this.ballMaxVel &&
        //     (this.ballVelX += this.ballMaxVel / this.ballVelIncreaseFactor);
        if (Math.abs(this.ballVelX) < this.ballMaxVel) {
            this.ballVelX +=
                ((this.ballVelX < 0 ? -1 : 1) * this.ballMaxVel) /
                this.ballVelIncreaseFactor;
        }
    }

    movePaddleDown(playeId) {
        playeId === 1 ? (this.paddle1VelY = 1) : (this.paddle2VelY = 1);
    }

    movePaddleUp(playeId) {
        playeId === 1 ? (this.paddle1VelY = -1) : (this.paddle2VelY = -1);
    }

    stopPaddle(playeId) {
        playeId === 1 ? (this.paddle1VelY = 0) : (this.paddle2VelY = 0);
    }

    moveBall() {
        // Game over
        if (this.ballPosX < this.paddleGap + this.ballRadius * 2) {
            if (
                this.ballPosY + this.ballRadius >=
                    this.paddle1Y - this.paddleLength / 2 &&
                this.ballPosY - this.ballRadius <=
                    this.paddle1Y + this.paddleLength / 2
            ) {
                this.ballVelX *= -1;
                this.ballVelY =
                    (this.ballPosY - (this.paddle1Y - this.paddleLength / 2)) /
                    this.paddleLength;
                this.ballVelY = (this.ballVelY * 2 - 1) * this.ballMaxVel;
            } else {
                this.score[1] += 1;
                this.newGame();
            }
        }
        if (this.ballPosX > this.width - this.paddleGap - this.ballRadius * 2) {
            if (
                this.ballPosY + this.ballRadius >=
                    this.paddle2Y - this.paddleLength / 2 &&
                this.ballPosY - this.ballRadius <=
                    this.paddle2Y + this.paddleLength / 2
            ) {
                this.ballVelX *= -1;
                this.ballVelY =
                    (this.ballPosY - (this.paddle2Y - this.paddleLength / 2)) /
                    this.paddleLength;
                this.ballVelY = (this.ballVelY * 2 - 1) * this.ballMaxVel;
            } else {
                this.score[0] += 1;
                this.newGame();
                console.log(this.score);
            }
        }

        // wall bounce
        if (
            this.ballPosY < 0 + this.ballRadius ||
            this.ballPosY > this.width - this.ballRadius
        )
            this.ballVelY *= -1;

        // ball movement
        this.ballPosX += this.ballVelX;
        this.ballPosY += this.ballVelY;
    }

    movePaddle() {
        this.paddle1Y += this.paddle1VelY;
        this.paddle2Y += this.paddle2VelY;
        this.paddle1Y = Math.min(
            this.height - this.paddleLength / 2,
            Math.max(0 + this.paddleLength / 2, this.paddle1Y)
        );
        this.paddle2Y = Math.min(
            this.height - this.paddleLength / 2,
            Math.max(0 + this.paddleLength / 2, this.paddle2Y)
        );
    }
}

// Export for Node.js (backend)
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Pong };
}

// Attach to `window` for the browser (frontend)
if (typeof window !== "undefined") {
    window.Pong = Pong;
}
