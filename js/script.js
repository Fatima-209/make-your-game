// connecting html elements with js
const boardSize = 20;
var scoreElement = document.getElementById('score');
var timerElement = document.getElementById('timer');
var livesElement = document.getElementById('lives');
var gbElement = document.getElementById('game-board');
var lastTenderTiem = 0;

var lives = 3;
let lastDirectionX = 1;
let lastDirectionY = 0;
// -1 = left, 0 = no horizontal movement, 1 = right
let directionX = 1;
// -1 is up, 0 no vertical movement, 1 is down 
let directionY = 0;


let snakePosition = [
    { x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
let food = { x: 5, y: 5 };


function drawSnake() {
    gbElement.innerHTML = "";
    snakePosition.forEach(segment => {
        // adds a div
        const snakeSeg = document.createElement('div');
        // adds the position of the row
        snakeSeg.style.gridRowStart = segment.y;
        // column position
        snakeSeg.style.gridColumnStart = segment.x;
        // to implement the snake class
        snakeSeg.classList.add('snake');
        gbElement.appendChild(snakeSeg);
    });
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gbElement.appendChild(foodElement);
}
// event listener
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp' && lastDirectionY !== 1) {
        directionX = 0;
        directionY = -1;
    } else if (event.key == 'ArrowDown' && lastDirectionY !== -1) {
        directionX = 0;
        directionY = 1;
    } else if (event.key == 'ArrowRight' && lastDirectionX !== -1) {
        directionX = 1;
        directionY = 0;
    } else if (event.key == 'ArrowLeft' && lastDirectionX !== 1) {
        directionX = -1;
        directionY = 0;
    }
})

function gameLoop() {
    let head = snakePosition[0];
    let newHead = { x: head.x + directionX, y: head.y + directionY }
    snakePosition.unshift(newHead);
    // collision with the wall
    if (newHead.x < 1 || newHead.x > boardSize || newHead.y < 1 || newHead.y > boardSize) {
        alert('You hit the wall!')
        lives -= 1;
        livesElement.textContent = `Lives: ${lives}`;
        if (lives <= 0) {
            alert('Game Over!')
        } else {
            snakePosition = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
            directionX = 0;
            directionY = 0;
        }
    }
    // collision with itself
    for (let i = 1; i < snakePosition.length; i++) {
    if (newHead.x === snakePosition[i].x && newHead.y === snakePosition[i].y) {
        alert('You hit the snake itself!')
        lives -= 1;
        livesElement.textContent = `Lives: ${lives}`;
        if (lives <= 0) {
            alert('Game Over!')
        } else {
            snakePosition = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
            directionX = 0;
            directionY = 0;
        }
    }
}
    // collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
        // random would give nums bet 0 and 19.999 and the floor would round it down
        food = {
            x: Math.floor(Math.random() * boardSize) + 1,
            y: Math.floor(Math.random() * boardSize) + 1
        }
        // to avoid reversing
        lastDirectionX = directionX;
        lastDirectionY = directionY;

    } else {
        // this will remove the last segment 
        snakePosition.pop();
    }

};
drawSnake();
