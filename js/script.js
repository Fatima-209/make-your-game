// connecting html elements with js
var scoreElement = document.getElementById('score');
var timerElement = document.getElementById('timer');
var livesElement = document.getElementById('lives');
var gbElement = document.getElementById('game-board');
let directionX = 0;
let directionY = 0;
// event listners to update the snake position based on the users keys
document.addEventListener('keydown', function(event){
  console.log('Key pressed:', event.key);
}) 
