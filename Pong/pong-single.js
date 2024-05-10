window.onload = function () {
  // Basic parameters of the screen
  const WIDTH = 900;
  const HEIGHT = 600;
  const canvas = document.getElementById("gameCanvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  // In your game loop...

  // Game objects
  let player1 = { x: 20, y: 0, width: 10, height: 100, dy: 0, score: 0 };
  let computer = {
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
  let computerColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--computer-color")
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

  // Display scores
  ctx.fillStyle = textColor;
  ctx.font = textFont;
  ctx.fillText("Player 1: " + player1.score, 100, 30);
  ctx.fillText("Computer: " + computer.score, WIDTH - 200, 30);

  console.log(player1Color, computerColor, ballColor, textColor, textFont);

  // Add event listeners for keydown and keyup events
  window.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("keyup", keyUpHandler, false);

  // Define the key handler functions
  function keyDownHandler(event) {
    switch (event.key) {
      case "ArrowUp":
        player1.dy = -2;
        break;
      case "ArrowDown":
        player1.dy = 2;
        break;
    }
  }

  function keyUpHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
        player1.dy = 0;
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

    // AI for the computer
    let computerCenter = computer.y + computer.height / 2;
    if (computerCenter < ball.y - 35) {
      computer.dy = 2;
    } else if (computerCenter > ball.y + 35) {
      computer.dy = -2;
    } else {
      computer.dy = 0;
    }
    // Add some randomness to the AI
    if (Math.random() < 0.1) {
      computer.dy = -computer.dy;
    }
    computer.y += computer.dy;

    // Prevent players from going off screen
    if (player1.y < 0) player1.y = 0;
    if (player1.y > HEIGHT - player1.height)
      player1.y = HEIGHT - player1.height;
    if (computer.y < 0) computer.y = 0;
    if (computer.y > HEIGHT - computer.height)
      computer.y = HEIGHT - computer.height;

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
      ball.dx *= -1.05; // Increase speed and change direction
      if (Math.abs(ball.dx) > 5) ball.dx = 5 * Math.sign(ball.dx); // Limit the speed
    } else if (
      ball.x + ball.radius > computer.x &&
      ball.y > computer.y &&
      ball.y < computer.y + computer.height
    ) {
      ball.dx *= -1.05; // Increase speed and change direction
      if (Math.abs(ball.dx) > 5) ball.dx = 5 * Math.sign(ball.dx); // Limit the speed
    }

    // Check if the ball goes past the left or right edge
    if (ball.x < 0) {
      computer.score++; // Increment computer's score
      resetBall(); // Reset the ball
      if (computer.score >= 10) {
        if (confirm("Game Over! Computer wins! Do you want to play again?")) {
          document.location.reload();
        } else {
          window.location.href = "../index.html";
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
    ctx.fillStyle = computerColor;
    ctx.fillRect(computer.x, computer.y, computer.width, computer.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();

    // Display scores
    ctx.fillStyle = textColor;
    ctx.font = textFont;
    ctx.fillText("Player 1: " + player1.score, 100, 30);
    ctx.fillText("Computer: " + computer.score, WIDTH - 200, 30);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
};
