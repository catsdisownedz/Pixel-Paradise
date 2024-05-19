// Slate shown when player wins

Mario.WinState = function (score) {
  this.waitTime = 2;
  this.drawManager = null;
  this.camera = null;
  this.font = null;
  this.kissing = null;
  this.wasKeyDown = false;
  this.score = score;
};

Mario.WinState.prototype = new Engine.GameState();

Mario.WinState.prototype.Enter = function () {
  this.drawManager = new Engine.DrawableManager();
  this.camera = new Engine.Camera();

  this.font = Mario.SpriteCuts.CreateBlackFont();
  this.font.Strings[0] = {
    String: "Thank you for saving me, Mario!",
    X: 36,
    Y: 160,
  };

  this.kissing = new Engine.AnimatedSprite();
  this.kissing.Image = Engine.Resources.Images["endScene"];
  this.kissing.X = 112;
  this.kissing.Y = 52;
  this.kissing.SetColumnCount(2);
  this.kissing.SetRowCount(1);
  this.kissing.AddNewSequence("loop", 0, 0, 0, 1);
  this.kissing.PlaySequence("loop", true);
  this.kissing.FramesPerSecond = 1 / 2;

  this.waitTime = 2;

  this.drawManager.Add(this.font);
  this.drawManager.Add(this.kissing);
};

Mario.WinState.prototype.Exit = function () {
  this.drawManager.Clear();
  delete this.drawManager;
  delete this.camera;
};

Mario.WinState.prototype.Update = function (delta) {
  this.drawManager.Update(delta);

  if (this.waitTime > 0) {
    this.waitTime -= delta;
  } else {
    if (Engine.KeyboardInput.IsKeyDown(Engine.Keys.S)) {
      this.wasKeyDown = true;
    }
  }
};

Mario.WinState.prototype.Draw = function (context) {
  this.drawManager.Draw(context, this.camera);
};

Mario.WinState.prototype.CheckForChange = function (context) {
  if (this.waitTime <= 0) {
    if (Engine.KeyboardInput.IsKeyDown(Engine.Keys.One)) {
      // Go to main menu
      window.location.href = "../index.php";
    } else if (Engine.KeyboardInput.IsKeyDown(Engine.Keys.Two)) {
      // Go to leaderboard
      window.location.href = "../leaderBoard.php";
    }
    if (this.wasKeyDown && !Engine.KeyboardInput.IsKeyDown(Engine.Keys.S)) {
      context.ChangeState(new Mario.TitleState());
    }
  }
};

function sendScoreToServer(score) {
  let state = {
    game: "Mario Bros",
    score: score,
  };
  fetch("../highscores.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(state),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log(data);
    });
}
