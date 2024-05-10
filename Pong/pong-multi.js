window.onload = function () {
  // Basic parameters of the screen
  const WIDTH = 900;
  const HEIGHT = 600;
  const canvas = document.getElementById("gameCanvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  // Game objects
  let player1 = { x: 20, y: 0, width: 10, height: 100, dy: 0, score: 0 };
  let player2 = {
    x: WIDTH - 30,
    y: 0,
    width: 10,
    height: 100,
    dy: 0,
    score: 0,
  };
  let ball = { x: WIDTH / 2, y: HEIGHT / 2, radius: 7, dx: 2, dy: 2 };

  // Set colors and font
  let player1Color = getComputedStyle(document.documentElement)
    .getPropertyValue("--player1-color")
    .trim();
  let player2Color = getComputedStyle(document.documentElement)
    .getPropertyValue("--player2-color")
    .trim();
  let ballColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--ball-color")
    .trim();
  let textColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--text-color")
    .trim();
  let textFont = getComputedStyle(document.documentElement)
    .getPropertyValue("--text-font")
    .trim();

  // Add event listeners for keydown and keyup events
  window.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("keyup", keyUpHandler, false);

  // Define the key handler functions
  function keyDownHandler(event) {
    switch (event.key) {
      case "w":
        player1.dy = -2;
        break;
      case "s":
        player1.dy = 2;
        break;
      case "ArrowUp":
        player2.dy = -2;
        break;
      case "ArrowDown":
        player2.dy = 2;
        break;
    }
  }

  function keyUpHandler(event) {
    switch (event.key) {
      case "w":
      case "s":
        player1.dy = 0;
        break;
      case "ArrowUp":
      case "ArrowDown":
        player2.dy = 0;
        break;
    }
  }

  // Function to reset the ball to the center
  function resetBall() {
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    ball.dx = -ball.dx; // Change ball direction
    ball.dy = 2; // Reset ball speed
  }

  // Game loop
  function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Update player positions
    player1.y += player1.dy;
    player2.y += player2.dy;

    // Prevent players from going off screen
    if (player1.y < 0) player1.y = 0;
    if (player1.y > HEIGHT - player1.height)
      player1.y = HEIGHT - player1.height;
    if (player2.y < 0) player2.y = 0;
    if (player2.y > HEIGHT - player2.height)
      player2.y = HEIGHT - player2.height;

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Detect ball collision with top and bottom of screen
    if (ball.y < 0 || ball.y > HEIGHT) ball.dy *= -1;

    // Detect ball collision with players
    if (
      ball.x - ball.radius < player1.x + player1.width &&
      ball.y > player1.y &&
      ball.y < player1.y + player1.height
    ) {
      ball.dx *= -1.02; // Slightly increase speed and change direction
    } else if (
      ball.x + ball.radius > player2.x &&
      ball.y > player2.y &&
      ball.y < player2.y + player2.height
    ) {
      ball.dx *= -1.02; // Slightly increase speed and change direction
    }

    // Check if the ball goes past the left or right edge
    if (ball.x < 0) {
      player2.score++; // Increment player2's score
      resetBall(); // Reset the ball
      if (player2.score >= 10) {
        if (confirm("Game Over! player2 wins! Do you want to play again?")) {
          document.location.reload();
        } else {
          window.location.href = "..index.html";
        }
      }
    } else if (ball.x > WIDTH) {
      player1.score++; // Increment player 1's score
      resetBall(); // Reset the ball
      if (player1.score >= 10) {
        if (confirm("Game Over! Player 1 wins! Do you want to play again?")) {
          document.location.reload();
        } else {
          window.location.href = "../index.html";
        }
      }
    }

    // Draw players
    ctx.fillStyle = player1Color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillStyle = player2Color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();

    // Display scores
    ctx.fillStyle = textColor;
    ctx.font = textFont;
    ctx.fillText("Player 1: " + player1.score, 100, 30);
    ctx.fillText("Player 2: " + player2.score, WIDTH - 200, 30);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
};
