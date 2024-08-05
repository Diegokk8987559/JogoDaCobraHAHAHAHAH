let snake;
let food;
let gridSize = 20;
let tileSize = 20;

function setup() {
    createCanvas(400, 400);
    frameRate(10);
    snake = new Snake();
    food = createFood();
}

function draw() {
    background(220);
    snake.update();
    snake.show();

    if (snake.eat(food)) {
        food = createFood();
    }

    fill(255, 0, 0);
    rect(food.x, food.y, tileSize, tileSize);

    if (snake.endGame()) {
        background(255, 0, 0);
        noLoop();
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);
        text('Game Over!', width / 2, height / 2);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW && snake.yspeed === 0) {
        snake.setDir(0, -1);
    } else if (keyCode === DOWN_ARROW && snake.yspeed === 0) {
        snake.setDir(0, 1);
    } else if (keyCode === LEFT_ARROW && snake.xspeed === 0) {
        snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW && snake.xspeed === 0) {
        snake.setDir(1, 0);
    }
}

function createFood() {
    let cols = floor(width / tileSize);
    let rows = floor(height / tileSize);
    let food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(tileSize);
    return food;
}

class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(floor(width / 2), floor(height / 2));
        this.xspeed = 0;
        this.yspeed = 0;
    }

    setDir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    update() {
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();
        head.x += this.xspeed * tileSize;
        head.y += this.yspeed * tileSize;
        this.body.push(head);
    }

    grow() {
        let head = this.body[this.body.length - 1].copy();
        this.body.push(head);
    }

    endGame() {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x > width - tileSize || x < 0 || y > height - tileSize || y < 0) {
            return true;
        }
        for (let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i];
            if (part.x === x && part.y === y) {
                return true;
            }
        }
        return false;
    }

    eat(pos) {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x === pos.x && y === pos.y) {
            this.grow();
            return true;
        }
        return false;
    }

    show() {
        for (let i = 0; i < this.body.length; i++) {
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, tileSize, tileSize);
        }
    }
}
