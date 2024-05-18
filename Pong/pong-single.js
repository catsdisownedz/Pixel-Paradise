var Game = {
  initialize: function () {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // Update the resize event handler
    var self = this; // Reference to the this object for use in the resize event handler
    window.addEventListener("resize", function () {
      // Update the canvas dimensions
      self.canvas.width = window.innerWidth;
      self.canvas.height = window.innerHeight;

      // Update the canvas style dimensions
      self.canvas.style.width = window.innerWidth * 0.8;
      self.canvas.style.height = window.innerHeight * 0.8;

      // Update the font size based on new canvas size
      self.fontSize = self.canvas.width * 0.035; // 3.5% of canvas width
      self.rectWidth = self.canvas.width * 0.5; // 50% of canvas width
      self.rectHeight = self.canvas.height * 0.1; // 10% of canvas height

      // Update the positions and sizes of the paddles, ball, and other this elements
      self.player = Paddle.new.call(self, "left");
      self.paddle = Paddle.new.call(self, "right");
      self.ball = Ball.new.call(self);

      // Redraw the this to apply the new sizes and positions
      self.draw();
    });
    this.canvas.style.width = window.innerWidth * 0.8;
    this.canvas.style.height = window.innerHeight * 0.8;
    this.player = Paddle.new.call(this, "left");
    this.paddle = Paddle.new.call(this, "right");
    this.ball = Ball.new.call(this);
    this.paddle.speed = initialPaddleSpeed = 8;
    this.running = this.over = false;
    this.turn = this.paddle;
    this.timer = this.round = 0;
    this.color = "#11001e";
    speedIncrement = 1;
    Pong.menu();
    Pong.listen();
  },

  endthisMenu: function (text) {
    // Change the canvas font size based on window size
    var fontSize = this.canvas.width * 0.035; // 3.5% of canvas width
    this.context.font = fontSize + "px Courier New";
    this.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press any key to begin' text.
    var rectWidth = this.canvas.width * 0.5; // 50% of canvas width
    var rectHeight = this.canvas.height * 0.1; // 10% of canvas height
    var rectX = (this.canvas.width - rectWidth) / 2; // center horizontally
    var rectY = (this.canvas.height - rectHeight) / 2; // center vertically
    this.context.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Change the canvas color
    this.context.fillStyle = "#ffffff";

    // Draw the end this menu text ('this Over' and 'Winner')
    this.context.fillText(
      text,
      this.canvas.width / 2,
      this.canvas.height / 2 + fontSize / 2
    );

    setTimeout(function () {
      Pong = Object.assign({}, this);
      Pong.initialize();
    }, 3000);
  },

  menu: function () {
    // Draw all the Pong objects in their current state
    Pong.draw();

    // Change the canvas font size and color
    var fontSize = this.canvas.width * 0.035; // 3.5% of canvas width
    this.context.font = fontSize + "px Courier New";
    this.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press any key to begin' text.
    var rectWidth = this.canvas.width * 0.5; // 50% of canvas width
    var rectHeight = this.canvas.height * 0.1; // 10% of canvas height
    var rectX = (this.canvas.width - rectWidth) / 2; // center horizontally
    var rectY = (this.canvas.height - rectHeight) / 2; // center vertically
    this.context.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Change the canvas color;
    this.context.fillStyle = "#ffffff";

    // Draw the 'press any key to begin' text
    this.context.fillText(
      "Press any key to begin",
      this.canvas.width / 2,
      this.canvas.height / 2 + fontSize / 2
    );
  },

  // Update all objects (move the player, paddle, ball, increment the score, etc.)
  update: function () {
    if (!this.over) {
      // Update dynamic elements like scores based on new canvas size
      var scoreFontSize = this.canvas.width * 0.07; // 7% of canvas width
      this.context.font = scoreFontSize + "px Courier New";

      // If the ball collides with the bound limits - correct the x and y coords.
      if (this.ball.x <= 0)
        Pong._resetTurn.call(this, this.paddle, this.player);
      if (this.ball.x >= this.canvas.width - this.ball.width)
        Pong._resetTurn.call(this, this.player, this.paddle);
      if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
      if (this.ball.y >= this.canvas.height - this.ball.height)
        this.ball.moveY = DIRECTION.UP;
      // Move player if they player.move value was updated by a keyboard event
      if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
      else if (this.player.move === DIRECTION.DOWN)
        this.player.y += this.player.speed;
      // On new serve (start of each turn) move the ball to the correct side
      // and randomize the direction to add some challenge.
      if (Pong._turnDelayIsOver.call(this) && this.turn) {
        this.ball.moveX =
          this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
        this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][
          Math.round(Math.random())
        ];
        this.ball.y =
          Math.floor(Math.random() * this.canvas.height - 200) + 200;
        this.turn = null;
      }
      // If the player collides with the bound limits, update the x and y coords.
      if (this.player.y <= 0) this.player.y = 0;
      else if (this.player.y >= this.canvas.height - this.player.height)
        this.player.y = this.canvas.height - this.player.height;
      // Move ball in intended direction based on moveY and moveX values
      if (this.ball.moveY === DIRECTION.UP)
        this.ball.y -= this.ball.speed / 1.5;
      else if (this.ball.moveY === DIRECTION.DOWN)
        this.ball.y += this.ball.speed / 1.5;
      if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
      else if (this.ball.moveX === DIRECTION.RIGHT)
        this.ball.x += this.ball.speed;
      // Handle paddle (AI) UP and DOWN movement
      var difficultyFactor = 0.35 + this.round * 0.1; // Increase the factor by 0.05 each round
      if (
        this.paddle.y > this.ball.y - this.paddle.height / 2 &&
        Math.random() < difficultyFactor
      ) {
        if (this.ball.moveX === DIRECTION.RIGHT)
          this.paddle.y -= this.paddle.speed / 1.5;
        else this.paddle.y -= this.paddle.speed / 4;
      }
      if (
        this.paddle.y < this.ball.y - this.paddle.height / 2 &&
        Math.random() < difficultyFactor
      ) {
        if (this.ball.moveX === DIRECTION.RIGHT)
          this.paddle.y += this.paddle.speed / 1.5;
        else this.paddle.y += this.paddle.speed / 4;
      }
      // Increase the paddle's speed with each round
      this.paddle.speed = initialPaddleSpeed + this.round * speedIncrement;
      // Handle paddle (AI) wall collision
      if (this.paddle.y >= this.canvas.height - this.paddle.height)
        this.paddle.y = this.canvas.height - this.paddle.height;
      else if (this.paddle.y <= 0) this.paddle.y = 0;
      // Handle Player-Ball collisions
      if (
        this.ball.x - this.ball.width <= this.player.x &&
        this.ball.x >= this.player.x - this.player.width
      ) {
        if (
          this.ball.y <= this.player.y + this.player.height &&
          this.ball.y + this.ball.height >= this.player.y
        ) {
          this.ball.x = this.player.x + this.ball.width;
          this.ball.moveX = DIRECTION.RIGHT;
          ballHit.play();
        }
      }
      // Handle paddle-ball collision
      if (
        this.ball.x - this.ball.width <= this.paddle.x &&
        this.ball.x >= this.paddle.x - this.paddle.width
      ) {
        if (
          this.ball.y <= this.paddle.y + this.paddle.height &&
          this.ball.y + this.ball.height >= this.paddle.y
        ) {
          this.ball.x = this.paddle.x - this.ball.width;
          this.ball.moveX = DIRECTION.LEFT;
          ballHit.play();
        }
      }
    }

    // Handle the end of round transition
    // Check to see if the player won the round.
    if (this.player.score === rounds[this.round]) {
      // Check to see if there are any more rounds/levels left and display the victory screen if
      // there are not.
      if (!rounds[this.round + 1]) {
        this.over = true;
        setTimeout(function () {
          Pong.endthisMenu("Winner!");
        }, 1000);
      } else if (this.paddle.score === rounds[this.round]) {
        // Check to see if the paddle/AI has won the round.
        this.over = true;
        setTimeout(function () {
          Pong.endthisMenu("this Over!");
        }, 1000);
      } else {
        // If there is another round, reset all the values and increment the round number.
        this.color = this._generateRoundColor();
        this.player.score = this.paddle.score = 0;
        this.player.speed += 0.5;
        this.paddle.speed += 1;
        this.ball.speed += 1;
        this.round += 1;
        start.play();
      }
    }
  },

  // Draw the objects to the canvas element
  draw: function () {
    // Clear the Canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Set the fill style to black (if intended for background)
    this.context.fillStyle = this.color;

    // Update dynamic elements like scores based on new canvas size
    var scoreFontSize = this.canvas.width * 0.07; // 7% of canvas width
    this.context.font = scoreFontSize + "px Courier New";

    // Set the fill style to white (For the paddles and the ball)
    this.context.fillStyle = "#ffffff";
    // Draw the Player
    this.context.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
    // Draw the Paddle
    this.context.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.width,
      this.paddle.height
    );
    // Draw the Ball
    if (Pong._turnDelayIsOver.call(this)) {
      this.context.fillRect(
        this.ball.x,
        this.ball.y,
        this.ball.width,
        this.ball.height
      );
    }

    // Write the this start prompt
    this.context.beginPath(); // Start a new path for the line
    this.context.moveTo(this.canvas.width / 2, this.canvas.height - 140);
    this.context.lineTo(this.canvas.width / 2, 140);
    // this.context.stroke(); // Render the line

    // Set the default canvas font and align it to the center
    this.context.font = "100px Courier New";
    this.context.textAlign = "center";

    // Draw the players score (left)
    this.context.fillText(
      this.player.score.toString(),
      this.canvas.width / 2 - 300,
      200
    );
    // Draw the paddles score (right)
    this.context.fillText(
      this.paddle.score.toString(),
      this.canvas.width / 2 + 300,
      200
    );
    // Change the font size for the center score text
    this.context.font = "30px Courier New";
    // Draw the winning score (center)
    this.context.fillText(
      "Round " + (Pong.round + 1),
      this.canvas.width / 2,
      35
    );
    // Change the font size for the center score value
    this.context.font = "40px Courier";
    // Draw the current round number
    this.context.fillText(
      rounds[Pong.round] ? rounds[Pong.round] : rounds[Pong.round - 1],
      this.canvas.width / 2,
      100
    );
  },

  showPauseMenu: function () {
    // Update the score display
    document.getElementById("scoreDisplay").textContent =
      "Score: " + this.player.score;

    // Show the pause menu
    document.getElementById("pause-menu").style.display = "block";
    document
      .getElementById("resumeButton")
      .addEventListener("click", function () {
        // Resume the game
        Pong.togglePause();
      });

    document
      .getElementById("exitButton")
      .addEventListener("click", function () {
        // Exit the game
        window.location.href = "../index.php";
      });
  },

  hidePauseMenu: function () {
    // Hide the pause menu
    document.getElementById("pause-menu").style.display = "none";
    document
      .getElementById("resumeButton")
      .removeEventListener("click", window.resumeGame);
  },

  togglePause: function () {
    this.paused = !this.paused;
    if (this.paused) {
      // Show the pause menu
      this.showPauseMenu();
    } else {
      // Hide the pause menu
      this.hidePauseMenu();
      this.loop();
    }
  },

  loop: function () {
    Pong.update();
    Pong.draw();
    // If the this is not over and game is not paused, draw the next frame.
    if (!Pong.over && !this.paused) requestAnimationFrame(this.loop.bind(this)); // Bind 'this' to maintain context
  },

  listen: function () {
    var self = this; // Reference to the this object for use in event listeners
    document.addEventListener("keydown", function (key) {
      // Handle the 'Press any key to begin' function and start the this.
      if (self.running === false) {
        self.running = true;
        start.play();
        window.requestAnimationFrame(self.loop.bind(self));
      }
      // Handle up arrow and w key events
      if (key.keyCode === 38 || key.keyCode === 87)
        self.player.move = DIRECTION.UP;
      // Handle down arrow and s key events
      if (key.keyCode === 40 || key.keyCode === 83)
        self.player.move = DIRECTION.DOWN;
      // Handle 'Esc' key event
      if (key.keyCode === 27)
        // 27 is the keyCode for the 'Esc' key
        self.togglePause(); // Assuming you have a function to toggle the pause state
    });
    // Stop the player from moving when there are no keys being pressed.
    document.addEventListener("keyup", function (key) {
      self.player.move = DIRECTION.IDLE;
    });
  },

  // Reset the ball location, the player turns and set a delay before the next round begins.
  _resetTurn: function (victor, loser) {
    this.ball = Ball.new.call(this, this.ball.speed);
    this.turn = loser;
    this.timer = new Date().getTime();
    victor.score++;

    // Check if the victor is the player or the computer (paddle)
    if (victor === this.player) {
      victory.play(); // Play the victory sound when the user scores
    } else if (victor === this.paddle) {
      loss.play(); // Play the loss sound when the computer scores
    }
  },

  // Wait for a delay to have passed after each turn.
  _turnDelayIsOver: function () {
    return new Date().getTime() - this.timer >= 1000;
  },

  // Select a random color as the background of each level/round.
  _generateRoundColor: function () {
    var newColor = colors[Math.floor(Math.random() * colors.length)];
    if (newColor === this.color) return Pong._generateRoundColor();
    return newColor;
  },
};
