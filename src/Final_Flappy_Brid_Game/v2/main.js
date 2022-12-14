let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

const flappyBird = new Image();
const sprites = new Image();
flappyBird.src = './img/king_bird.png';
sprites.src = './img/sprites.png';

let game = 'start';
let frame = 0;
const BEST_SCORE = 'bestScore'

flappyBird.height = 26;
flappyBird.width = 38;
canvas.height = 484;
canvas.width = 900;

let arrGround = [];
let pipes = [];

const backGround = {
    sX: 226,
    sY: 0,
    sW: 226,
    sH: 400,
    cX: 0,
    cY: 0,
    cW: 226,
    cH: 400,
    draw: function () {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 224, this.cY, this.cW, this.cH);
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 448, this.cY, this.cW, this.cH);
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 672, this.cY, this.cW, this.cH);

    }
}

const numbers = [
    { name: 0, sX: 770, sY: 92, sW: 22, sH: 32, cW: 22, cH: 32 },
    { name: 1, sX: 209, sY: 710, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 2, sX: 455, sY: 249, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 3, sX: 475, sY: 250, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 4, sX: 500, sY: 249, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 5, sX: 520, sY: 250, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 6, sX: 455, sY: 286, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 7, sX: 478, sY: 286, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 8, sX: 500, sY: 286, sW: 20, sH: 32, cW: 20, cH: 32 },
    { name: 9, sX: 520, sY: 286, sW: 20, sH: 32, cW: 20, cH: 32 },
]

class Ground {
    constructor(cX, cY) {
        this.cX = cX;
        this.cY = cY;
        this.dX = -2;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(sprites, 457, 0, 260, 84, this.cX, this.cY, 260, 84);
    }
}


for (let i = 0; i < 5; i++) {
    let ground = new Ground();
    ground.cX = 225 * i;
    ground.cY = 400;
    arrGround.push(ground);
}

function drawArrGround() {
    arrGround.forEach(ground =>
        ground.draw()
    )
}

function updateArrGround() {
    arrGround.forEach(ground =>
        ground.cX += ground.dX
    )

    if (arrGround[0].cX <= -225) {
        arrGround.splice(0, 1);
        let ground = new Ground(arrGround[3].cX + 225, 400);
        arrGround.push(ground);
    }
}

const start = {
    draw: function () {
        ctx.beginPath();
        ctx.drawImage(sprites, 542, 142, 140, 36, 375, 150, 140, 36);
        ctx.drawImage(sprites, 460, 88, 140, 36, 378, 225, 140, 36);
        ctx.drawImage(sprites, 473, 132, 75, 85, 410, 275, 75, 85);
    }
}

const end = {
    draw: function () {
        ctx.beginPath();
        ctx.drawImage(sprites, 612, 88, 150, 34, 375, 150, 150, 34);
        ctx.drawImage(sprites, 7, 405, 175, 88, 375, 250, 175, 88);
        ctx.drawImage(sprites, 564, 198, 60, 20, 430, 350, 60, 20);
    }
}

class Pipes {
    constructor(cX, cY, space, dX) {
        this.cX = cX;
        this.cY = cY;
        this.cW = 40;
        this.cH = 250;
        this.space = space;
        this.sXt = 90;
        this.sYt = 505;
        this.sXb = 0;
        this.sYb = 505;
        this.sW = 42;
        this.sH = 250;
        this.dX = dX;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sXt, this.sYt, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        ctx.drawImage(sprites, this.sXb, this.sYb, this.sW, this.sH, this.cX, this.cY + this.space + this.cH, this.cW, this.cH);
    }
}


function random(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function newPipes() {
    for (let i = 1; i < 4; i++) {
        let pipe = new Pipes();
        pipe.cX = random(430, 500) * i;
        pipe.cY = random(-220, 0);
        pipe.space = random(140, 200);
        pipe.dX = -2;
        pipes.push(pipe);
    }
}

function drawArrPipes() {
    pipes.forEach(pipe =>
        pipe.draw()
    )
}

function updateArrPipes() {
    pipes.forEach(pipe => {
        pipe.cX += pipe.dX;
    })

    if (pipes[0].cX <= -82) {
        pipes.splice(0, 1);
        let space = random(140, 200);
        let speed = -2;

        if (score.value > 10) {
            space = random(100, 140);
        }

        let pipe = new Pipes(pipes[pipes.length - 1].cX + random(430, 500), random(-220, 0), space, speed);
        pipes.push(pipe);
    }
}

class Score {
    constructor(value, cX, cY) {
        this.value = value;
        this.cX = cX;
        this.cY = cY;
    }

    draw() {
        let split;
        ctx.beginPath();
        if (this.value > 9) {
            split = (this.value.toString()).split("");
            for (const number of numbers) {
                if (split[0] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width / 2 - 15, 60, number.cW, number.cH);
                }

                if (split[1] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width / 2 + 5, 60, number.cW, number.cH);
                }
            }
        } else {
            split = this.value.toString();
            for (const number of numbers) {
                if (split[0] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width / 2 - 26, 60, number.cW, number.cH);
                }
            }
        }
    }

    drawSmall() {
        let split;
        ctx.beginPath();
        if (this.value > 9) {
            split = (this.value.toString()).split("");
            for (const number of numbers) {
                if (split[0] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, this.cX, this.cY, number.cW / 2, number.cH / 2);
                }

                if (split[1] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, this.cX + 10, this.cY, number.cW / 2, number.cH / 2);
                }
            }
        } else {
            split = this.value.toString();
            for (const number of numbers) {
                if (split[0] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, this.cX + 5, this.cY, number.cW / 2, number.cH / 2);
                }
            }
        }
    }
}

class Bird {
    constructor() {
        this.x = canvas.width / 5;
        this.y = backGround.cH / 2;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(flappyBird, this.x, this.y);
    }

    update() {
        if (game == 'play' || game == 'end') {
            this.y += 2;
            if (this.y + flappyBird.height >= 400) {
                game = 'end';
                this.y = 400;
            }

            if (this.x + flappyBird.height > pipes[0].cX &&
                this.x < pipes[0].cX + pipes[0].cW && (
                    this.y < pipes[0].cY + pipes[0].cH ||
                    this.y + flappyBird.height > pipes[0].cY + pipes[0].cH + pipes[0].space
                )) {
                game = 'end';
            }

            if (this.x === pipes[0].cX + 40 || this.x === pipes[0].cX + 39) {
                score.value++;
            }
            bestScore.value = getBestScoreToLocalStorage(score.value);
        }
    }
}

class Medal {
    constructor(i) {
        this.sX = 188;
        this.sY = [400, 437, 900];
        this.sW = 40;
        this.sH = 37;
        this.cX = canvas.width / 2 - 58;
        this.cY = 280;
        this.cW = 40;
        this.cH = 37;
        this.i = i;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY[this.i], this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    }

    update() {
        if (score.value == 0) {
            this.i = 2;
        }

        if (score.value == bestScore.value) {
            this.i = 1;
        } else if (score.value >= bestScore.value / 2 && score.value < bestScore.value) {
            this.i = 0;

        }
    }
}

newPipes();
let score = new Score(0, 510, 275);
let bestScore = new Score(0, 510, 310);
let bird = new Bird();
let medal = new Medal();

function draw() {
    backGround.draw();
    bird.draw();
    drawArrGround();

    if (game === 'start') {
        start.draw();
    }

    if (game === 'play') {
        score.draw();
    }

    if (game === 'end') {
        end.draw();
        score.drawSmall();
        bestScore.drawSmall();
        medal.draw();
    }

}

function update() {
    if (game === 'play') {
        drawArrPipes();
        updateArrPipes();
        drawArrGround();
        updateArrGround();
    }
    bird.update();
    medal.update();

}

function run() {
    requestAnimationFrame(run);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    draw();
    update();
}

function getBestScoreToLocalStorage(currentScore) {
    let scoreData = parseInt(localStorage.getItem(BEST_SCORE));

    if (currentScore === 0 && isNaN(scoreData)) {
        scoreData = 0;
    }

    let maxScore = Math.max(currentScore, scoreData);
    localStorage.setItem(BEST_SCORE, JSON.stringify(maxScore));
    return maxScore;
}

document.addEventListener("click", function (event) {
    switch (game) {
        case 'start':
            game = 'play';
            break;
        case 'play':
            bird.y -= 60;
            break;
        case 'end':
            if (event.offsetX > canvas.width / 2 - 20 &&
                event.offsetX < canvas.width / 2 + 20 &&
                event.offsetY > 345 &&
                event.offsetY < 375
            ) {
                score.value = 0;
                pipes = [];
                newPipes();
                bird.y = backGround.cH / 2;
                game = 'start'
            }
            break;
    }
})

run();