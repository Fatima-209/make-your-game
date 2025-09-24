const boardSize = 20;
const gbElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const livesElement = document.getElementById('lives');
const pausedMsg = document.getElementById('paused-msg');
const restartBtn = document.getElementById('restart-btn');
const continueBtn = document.getElementById('continue-btn');
const gameOverMsg = document.getElementById('game-over');
const gameOverRestartBtn = document.getElementById('game-over-restart-btn');

let score = 0;
let lives = 3;
let isPaused = false;
let isGameOver = false;
let hasMoved = false;
// timer
let gameStartTime = null;
let elapsedPauseTime = 0;
let pauseStart = null;
let lastDisplayedScore = -1;
// timing (requestAnimationFrame loop)
let lastFrameTime = 0;
let acc = 0;
const MOVE_INTERVAL = 200; // how many ms between snake moves

// directions
let lastDirectionX = 0;
let lastDirectionY = 0;
let directionX = 0;
let directionY = 0;

let snakePosition = [
    { x: 10, y: 10 }];
let food = { x: 5, y: 5 };

function randomFoodNotOnSnake() {
    while (true) {
        const candidate = {
            x: Math.floor(Math.random() * (boardSize - 2)) + 2, // between 2 and boardSize-1
            y: Math.floor(Math.random() * (boardSize - 2)) + 2  // between 2 and boardSize-1
        };
        if (!snakePosition.some(s => s.x === candidate.x && s.y === candidate.y)) {
            return candidate;
        }
    }
}


function drawSnake() {
    gbElement.innerHTML = "";
    snakePosition.forEach(segment => {
        const snakeSeg = document.createElement('div');
        snakeSeg.style.gridRowStart = segment.y;
        snakeSeg.style.gridColumnStart = segment.x;
        snakeSeg.classList.add('snake');
        gbElement.appendChild(snakeSeg);
    });
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gbElement.appendChild(foodElement);
}

document.addEventListener('keydown', (event) => {
    if (isGameOver) return;
    if (event.key === 'ArrowLeft' && (snakePosition.length === 1 || lastDirectionX !== 1)) {
        directionX = -1; directionY = 0;
    } else if (event.key === 'ArrowRight' && (snakePosition.length === 1 || lastDirectionX !== -1)) {
        directionX = 1; directionY = 0;
    } else if (event.key === 'ArrowUp' && (snakePosition.length === 1 || lastDirectionY !== 1)) {
        directionX = 0; directionY = -1;
    } else if (event.key === 'ArrowDown' && (snakePosition.length === 1 || lastDirectionY !== -1)) {
        directionX = 0; directionY = 1;
    }
    else if (event.code === 'Space' || event.key === ' ') {
        if (isGameOver) return; // <--- ignore space if game over

        if (!isPaused) {
            isPaused = true;
            pausedMsg.style.display = 'block';
            pauseTimer();
        } else {
            isPaused = false;
            pausedMsg.style.display = 'none';
            resumeTimer();
        }
    }
}
);

if (continueBtn) {
    continueBtn.addEventListener('click', () => {
        if (!isGameOver && isPaused) {  // <-- allow continue when not game over
            isPaused = false;
            pausedMsg.style.display = 'none';
            resumeTimer();
        }
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', restartGame);
}
if (gameOverRestartBtn) {
    gameOverRestartBtn.addEventListener('click', () => {
        gameOverMsg.style.display = 'none';
        restartGame();
    });
}

function updateOnce() {
    calcTime();
    // If starting, always allow the first move
    if (snakePosition.length === 3 && directionX !== 0) {
        // Check if moving into body at game start
        const nextHeadX = snakePosition[0].x + directionX;
        const nextHeadY = snakePosition[0].y + directionY;
        if (snakePosition.some(seg => seg.x === nextHeadX && seg.y === nextHeadY)) {
            // Ignore the move. Wait for a valid direction.
            return;
        }
    }

    // If no direction chosen yet, don't move (this prevents immediate self-collision)
    if (directionX === 0 && directionY === 0) {
        return;
    }

    const head = snakePosition[0];
    const newHead = { x: head.x + directionX, y: head.y + directionY };

    if (newHead.x < 1 || newHead.x > boardSize || newHead.y < 1 || newHead.y > boardSize) {
        lives = Math.max(0, lives - 1);
        livesElement.textContent = `Lives: ${lives}`;

        if (lives === 0) {
            isGameOver = true;
            isPaused = true;
            gameOverMsg && (gameOverMsg.style.display = 'flex');
            return;
        }
        else {
            // reset snake but keep game running (let player press continue)
            snakePosition = [{ x: 10, y: 10 }];
            directionX = 0; directionY = 0;
            lastDirectionX = 0; lastDirectionY = 0;
            //isPaused = true;
            return;
        }
    }

    // check self collision BEFORE adding newHead
    if (hasMoved && snakePosition.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        lives = Math.max(0, lives - 1);
        livesElement.textContent = `Lives: ${lives}`;

        if (lives === 0) {
            isGameOver = true;
            isPaused = true;
            gameOverMsg && (gameOverMsg.style.display = 'flex');
            return;
        } else {
            snakePosition = [{ x: 10, y: 10 }];
            directionX = 0; directionY = 0;
            lastDirectionX = 0; lastDirectionY = 0;
            return;
        }
    }


    // safe to add the new head
    snakePosition.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        score += 1;
        scoreElement.textContent = `Score: ${score}`;
        food = randomFoodNotOnSnake();
    } else {
        snakePosition.pop();
    }

    // update lastDirection so reversing prevention works next time
    lastDirectionX = directionX;
    lastDirectionY = directionY;
    hasMoved = true;

}

function gameLoop(timestamp) {
    window.requestAnimationFrame(gameLoop);

    // compute delta
    if (!lastFrameTime) lastFrameTime = timestamp;
    const delta = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    // if paused, do not update
    if (isPaused) {
        pausedMsg && (pausedMsg.style.display = 'block');
        return;
    } else {
        pausedMsg && (pausedMsg.style.display = 'none');
    }

    acc += delta;
    while (acc >= MOVE_INTERVAL) {
        updateOnce();
        acc -= MOVE_INTERVAL;
    }
    drawSnake();
}


function restartGame() {
    hasMoved = false;
    isGameOver = false;
    lastFrameTime = 0;
    acc = 0;
    score = 0;
    lives = 3;
    directionX = 0; directionY = 0;
    lastDirectionX = 0; lastDirectionY = 0;
    isPaused = false;
    snakePosition = [{ x: 10, y: 10 }];
    food = randomFoodNotOnSnake();
    scoreElement.textContent = `Score: ${score}`;
    livesElement.textContent = `Lives: ${lives}`;
    pausedMsg && (pausedMsg.style.display = 'none');
    gameOverMsg && (gameOverMsg.style.display = 'none');
    // performance.now returns timestamp in ms
    gameStartTime = performance.now();
    elapsedPauseTime = 0;
    pauseStart = null;
    lastDisplayedScore = -1;
    timerElement.textContent = 'Time: 0s';
    drawSnake();
}
function calcTime() {
    if (!gameStartTime) return;
    const now = performance.now();
    // If it's currently paused (pauseStart set), use pauseStart as "frozen now"
    const effectiveNow = pauseStart ? pauseStart : now;

    const totalMs = effectiveNow - gameStartTime - elapsedPauseTime;
    const seconds = Math.floor(Math.max(0, totalMs) / 1000);

    if (seconds !== lastDisplayedScore) {
        timerElement.textContent = `Time: ${seconds}s`;
        lastDisplayedScore = seconds;
    }
}

function pauseTimer() {
    if (!pauseStart) {
        pauseStart = performance.now();
    }
}
function resumeTimer() {
    if (pauseStart) {
        elapsedPauseTime += performance.now() - pauseStart;
        pauseStart = null;
    }
}

restartGame();
drawSnake();
window.requestAnimationFrame(gameLoop);
