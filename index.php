<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="amazingstyle.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jacquarda+Bastarda+9&family=Micro+5&family=Ojuju:wght@200..800&family=Satisfy&family=Whisper&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia" />
  <link rel="stylesheet" href="https://fonts.google.com/specimen/Dancing+Script" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia&effect=neon|outline|emboss|shadow-multiple" />
  <link href="https://fonts.googleapis.com/css2?family=Jersey+25+Charted&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Jersey+25+Charted&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">

  <title>Retro Gaming Arcade</title>
</head>

<body>
  <header>
    <div class="profile-section">
      <a href="leaderBoard.php" <?php unset($_SESSION['game']); ?> class="level" id="wow"><?php include "calculateLevel.php"; ?></a>
      <span class="separator"> | </span>
      <a href="signUp.php">
        <img src="Previews/pfp.jpg" alt="Player profile pic" />
      </a>
      <span id="usernameLabel" class="username">
        <?php
        if (isset($_SESSION['logged-in']) && $_SESSION["logged-in"]) {
          echo htmlspecialchars($_SESSION["username"]);
        } else {
          echo "Guest User";
        }
        ?>
      </span>
    </div>
    <h1 id="title">Pixel Paradise</h1>
    <p>Power up your nostalgia!</p>
    <button id="logoutButton" class="logout-button">Logout</button>
  </header>
  <main>
    <div class="game-container">
      <div class="game">
        <a href="Pacman/pacman.html">
          <h2>Pac-Man</h2>
          <img src="Previews/pac-man.png" alt="Pac-Man game" />
          <video class="game-video" src="Previews/pac_prev.mp4" autoplay muted loop>
      </div>
      <div class="game">
        <h2>Snake</h2>
        <a href="Snake/snake.html">
          <img src="Previews/snakess.png" alt="Snake game" />
          <video class="game-video" src="Previews/snake-rec.mov" autoplay muted loop>
      </div>
      <div class="game">
        <h2>Pong</h2>
        <img src="Previews/pong.png" alt="Pong game" />
        <video class="game-video" src="Previews/pong-single-rec.mov" autoplay muted loop>
          <div class="options">
            <a href="Pong/pong-single.html" id="singlePlayer">Single Player</a>
            <span class="separator"> | </span>
            <a href="Pong/pong-multi.html" id="multiPlayer">Multiplayer</a>
          </div>
      </div>
      <div class="game">
        <h2>Mario Bros</h2>
        <a href="Mario Bros/mario-bros.html">
          <img src="Previews/mario-bros.png" alt="Mario Bros game" />
          <video class="game-video" src="Previews/mario-bros-rec.mp4" autoplay muted loop>
      </div>
      <div class="game">
        <h2>Flappy Bird</h2>
        <a href="Flappy Bird/flappyhtml.html">
          <img src="Images/flappyimage.png" alt="Flappy Bird game">
          <video class="game-video" src="previews/flappybird_prev.mp4" autoplay muted loop>
          </video>
        </a>
      </div>
      <div class="game">
        <h2>Break out</h2>
        <a href="Breakout/breakoutHomePage.html">
          <img src="previews/breakk.png" alt="Break Out game" />
          <video class="game-video" src="previews/breakoutvid.mp4" autoplay muted loop>
          </video>
        </a>
      </div>
      <div class="game">
        <h2>Tetris</h2>
        <a href="Tetris/tetris.html">
          <img src="previews/tetrisss.png" alt="Tetris game" />
          <video class="game-video" src="previews/tetris-rec.mov" autoplay muted loop>
          </video>
        </a>
      </div>
    </div>
  </main>

  <?php if (!isset($_SESSION['logged-in'])) : ?>
    <div id="loginPopup">
      <h2>Welcome Back!</h2>
      <form id="loginForm" action="login_process.php" method="post">
        <div class="stuff">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <button id="submitButton" type="submit">Login</button>
        </div>

      </form>
      <div id="message" class="message"></div>
      <div class="link-container">
        <a href="signUp.php">New User? Register Here </a>
        <span> | </span>
        <a href="#" id="continue"> Continue as Guest User</a>
      </div>
    </div>
  <?php else : ?>
    <p>Welcome, <?php echo htmlspecialchars($_SESSION["username"]); ?></p>
  <?php endif; ?>

  <script src="behind_the_scenes.js"></script>
</body>

</html>