class Pong {
    constructor() {
        this.gameRate = 90;
        this.lastGameTime = Date.now();
        this.width = 100;
        this.height = this.width;
        this.ballPosX = this.width / 2;
        this.ballPosY = this.height / 2;
        this.ballVelX = Math.random(-2, 2);
        this.ballVelY = Math.random(-2, 2);
    }

    calculateNextState() {
        if (Date.now() - this.lastGameTime >= 1000 / this.gameRate) {
            this.moveBall();
            this.lastGameTime = Date.now();
        }
    }

    moveBall() {
        if (this.ballPosX < 0 || this.ballPosX > this.width)
            this.ballVelX *= -1;
        if (this.ballPosY < 0 || this.ballPosY > this.width)
            this.ballVelY *= -1;
        this.ballPosX += this.ballVelX;
        this.ballPosY += this.ballVelY;
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
