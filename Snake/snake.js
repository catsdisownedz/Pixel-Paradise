var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

let eat = new Audio("sounds/bleep.mp3");
let lose = new Audio("sounds/gameover.mp3");

// the canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
// (e.g. 16 * 25 = 400)
var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,

  // snake velocity. Initially set to 0
  dx: 0,
  dy: 0,

  // keep track of the score -> number of apples eaten
  score: 0,

  // keep track of all grids the snake body occupies
  cells: [],

  // length of the snake. Set to 1 to start with a 1 pixel long snake
  maxCells: 1,
};

var apple = {
  x: 320,
  y: 320,
};

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var requestId;
// game loop
function loop() {
  requestId = requestAnimationFrame(loop);
  // slow game loop to 5 fps instead of 10 (60/12 = 5)
  if (++count < 12) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position vertically and vertically on edge of screen
  if (
    snake.x < 0 ||
    snake.x >= canvas.width ||
    snake.y < 0 ||
    snake.y >= canvas.height
  ) {
    gameOver();
    return; // Exit the function
  }

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw apple
  context.fillStyle = "white";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  // draw snake one cell at a time
  context.fillStyle = "green";
  snake.cells.forEach(function (cell, index) {
    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      snake.score++;
      eat.play();

      // canvas is 400x400 which is 25x25 grids
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      // snake occupies same space as a body part. end game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        gameOver();
        return; // Exit the function
      }
    }
  });
}

function gameOver() {
  lose.play();
  // Stop the game loop
  cancelAnimationFrame(requestId);
  // Show the game over overlay
  document.getElementById("gameOverOverlay").style.display = "block";
  // Update the final score
  document.getElementById("finalScore").textContent =
    "Final Score: " + snake.score;
}

// listen to keyboard events to move the snake
document.addEventListener("keydown", function (e) {
  // left arrow key
  if (e.which === 37 && snake.dx !== grid) {
    // Prevents the snake from going in the opposite direction
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy !== grid) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx !== -grid) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy !== -grid) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

document.getElementById("replayButton").addEventListener("click", function () {
  // Reset game variables and restart the game
  resetGame();
});

document
  .getElementById("leaderboardButton")
  .addEventListener("click", function () {
    // Show the leaderboard
    showLeaderboard();
  });

document.getElementById("exitButton").addEventListener("click", function () {
  // Redirect to index.php
  window.location.href = "../index.php";
});

function resetGame() {
  // Reset the snake object
  snake = {
    x: 160,
    y: 160,
    dx: 0,
    dy: 0,
    cells: [],
    maxCells: 1,
    score: 0, // Reset the score
  };

  // Reset the apple object
  apple = {
    x: 320,
    y: 320,
  };

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Hide the game over overlay
  document.getElementById("gameOverOverlay").style.display = "none";

  // Restart the game loop
  requestAnimationFrame(loop);
}

// start the game
requestAnimationFrame(loop);
