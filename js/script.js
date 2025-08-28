// connecting html elements with js
const boardSize = 20;
var scoreElement = document.getElementById('score');
var timerElement = document.getElementById('timer');
var livesElement = document.getElementById('lives');
var gbElement = document.getElementById('game-board');
let snakePosition = [
    { x: 10, y: 10 }, // head
    { x: 9, y: 10 }, // body
    { x: 8, y: 10 }]; // tail
let food = {x: 5, y: 5};
// -1 = left, 0 = no horizontal movement, 1 = right
let directionX = 0;
// 0 no vertical movement
let directionY = 0;

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
