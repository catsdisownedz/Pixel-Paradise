// State shown when player loses
var lose = new Audio("sounds/09. Game Over.mp3");

Mario.LoseState = function (score) {
  this.drawManager = null;
  this.camera = null;
  this.gameOver = null;
  this.font = null;
  this.wasKeyDown = false;
  this.score = score;
};

Mario.LoseState.prototype = new Engine.GameState();

Mario.LoseState.prototype.Enter = function () {
  lose.play();
  var self = this;
  this.drawManager = new Engine.DrawableManager();
  this.camera = new Engine.Camera();

  this.gameOver = new Engine.AnimatedSprite();
  this.gameOver.Image = Engine.Resources.Images["gameOverGhost"];
  this.gameOver.SetColumnCount(9);
  this.gameOver.SetRowCount(1);
  this.gameOver.AddNewSequence("turnLoop", 0, 0, 0, 8);
  this.gameOver.PlaySequence("turnLoop", true);
  this.gameOver.FramesPerSecond = 1 / 15;
  this.gameOver.X = 112;
  this.gameOver.Y = 68;
  self.score = this.score;

  self.font = Mario.SpriteCuts.CreateBlackFont(); // Use self instead of this
  self.font.Strings[0] = {
    String: "Game over! Score: " + self.score, // Use self instead of this
    X: 116,
    Y: 160,
  };

  this.drawManager.Add(this.font);
  this.drawManager.Add(this.gameOver);
};

Mario.LoseState.prototype.Exit = function () {
  lose.pause();
  this.drawManager.Clear();
  delete this.drawManager;
  delete this.camera;
  delete this.gameOver;
  delete this.font;
};

Mario.LoseState.prototype.Update = function (delta) {
  if (this.drawManager) {
    this.drawManager.Update(delta);
  }
  if (Engine.KeyboardInput.IsKeyDown(Engine.Keys.S)) {
    this.wasKeyDown = true;
  }
};

Mario.LoseState.prototype.Draw = function (context) {
  this.drawManager.Draw(context, this.camera);
};

Mario.LoseState.prototype.CheckForChange = function (context) {
  if (this.wasKeyDown && !Engine.KeyboardInput.IsKeyDown(Engine.Keys.S)) {
    context.ChangeState(new Mario.TitleState());
  }
};
