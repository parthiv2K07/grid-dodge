// ===============================
// GAME VARIABLES & DATA TYPES
// ===============================

let gameState = "START"; // START | PLAYING | GAME_OVER
let score = 0;
let isGameActive = false;

const gridSize = 5;
let gridCells = [];

let player = { x: 2, y: 2 };
let enemies = [
  { x: 0, y: 0 },
  { x: 4, y: 4 }
];

const gameConfig = {
  speed: 600
};

// ===============================
// DOM ELEMENTS
// ===============================

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

// ===============================
// EVENT HANDLING
// ===============================

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

document.addEventListener("keydown", handleMovement);

// ===============================
// FUNCTIONS (5+ USER DEFINED)
// ===============================

function startGame() {
  gameState = "PLAYING";
  isGameActive = true;
  score = 0;
  scoreDisplay.textContent = score;

  switchScreen(gameScreen);
  createGrid();
  updateGrid();

  gameLoop();
}

function restartGame() {
  player = { x: 2, y: 2 };
  enemies = [
    { x: 0, y: 0 },
    { x: 4, y: 4 }
  ];
  startGame();
}

function switchScreen(activeScreen) {
  startScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");

  activeScreen.classList.add("active");
}

function createGrid() {
  grid.innerHTML = "";
  gridCells = [];

  // NESTED LOOP (MANDATORY)
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
      gridCells.push(cell);
    }
  }
}

function updateGrid() {
  gridCells.forEach(cell => cell.className = "cell");

  const playerIndex = player.y * gridSize + player.x;
  gridCells[playerIndex].classList.add("player");

  enemies.forEach(enemy => {
    const enemyIndex = enemy.y * gridSize + enemy.x;
    gridCells[enemyIndex].classList.add("enemy");
  });
}

function handleMovement(e) {
  if (!isGameActive) return;

  if (e.key === "ArrowUp" && player.y > 0) player.y--;
  else if (e.key === "ArrowDown" && player.y < gridSize - 1) player.y++;
  else if (e.key === "ArrowLeft" && player.x > 0) player.x--;
  else if (e.key === "ArrowRight" && player.x < gridSize - 1) player.x++;

  updateGrid();
}

function moveEnemies() {
  // LOOP
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const direction = Math.floor(Math.random() * 4);

    if (direction === 0 && enemy.y > 0) enemy.y--;
    else if (direction === 1 && enemy.y < gridSize - 1) enemy.y++;
    else if (direction === 2 && enemy.x > 0) enemy.x--;
    else if (direction === 3 && enemy.x < gridSize - 1) enemy.x++;
  }
}

function checkCollision() {
  for (let enemy of enemies) {
    if (enemy.x === player.x && enemy.y === player.y) {
      endGame();
    }
  }
}

function updateScore() {
  score += 10;
  scoreDisplay.textContent = score;
}

function endGame() {
  isGameActive = false;
  gameState = "GAME_OVER";
  finalScore.textContent = score;
  switchScreen(gameOverScreen);
}

// ===============================
// GAME LOOP
// ===============================

function gameLoop() {
  if (!isGameActive) return;

  moveEnemies();
  checkCollision();
  updateScore();
  updateGrid();

  setTimeout(gameLoop, gameConfig.speed);
}
