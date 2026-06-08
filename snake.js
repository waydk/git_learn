const readline = require("readline");

const WIDTH = 20;
const HEIGHT = 10;

let snake = [
    { x: 5, y: 5 }
];

let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
};

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (_, key) => {
    if (key.ctrl && key.name === "c") {
        process.exit();
    }

    if (key.name === "up" && direction !== "DOWN") {
        direction = "UP";
    }

    if (key.name === "down" && direction !== "UP") {
        direction = "DOWN";
    }

    if (key.name === "left" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (key.name === "right" && direction !== "LEFT") {
        direction = "RIGHT";
    }
});

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT)
    };
}

function draw() {
    console.clear();

    for (let y = 0; y < HEIGHT; y++) {
        let row = "";

        for (let x = 0; x < WIDTH; x++) {

            if (x === food.x && y === food.y) {
                row += "🍎";
                continue;
            }

            const snakePart = snake.find(
                segment => segment.x === x && segment.y === y
            );

            if (snakePart) {
                row += "🟩";
            } else {
                row += "⬛";
            }
        }

        console.log(row);
    }

    console.log(`Score: ${snake.length - 1}`);
}

function move() {

    const head = { ...snake[0] };

    switch (direction) {
        case "UP":
            head.y--;
            break;
        case "DOWN":
            head.y++;
            break;
        case "LEFT":
            head.x--;
            break;
        case "RIGHT":
            head.x++;
            break;
    }

    if (
        head.x < 0 ||
        head.x >= WIDTH ||
        head.y < 0 ||
        head.y >= HEIGHT
    ) {
        console.clear();
        console.log("GAME OVER");
        console.log(`Score: ${snake.length - 1}`);
        process.exit();
    }

    if (
        snake.some(
            part => part.x === head.x && part.y === head.y
        )
    ) {
        console.clear();
        console.log("GAME OVER");
        console.log(`Score: ${snake.length - 1}`);
        process.exit();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        spawnFood();
    } else {
        snake.pop();
    }
}

setInterval(() => {
    move();
    draw();
}, 200);