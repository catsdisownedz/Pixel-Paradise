// Demo of the engine
Engine.Application = function () {
  this.canvas = null;
  this.timer = null;
  this.stateContext = nu;
};

Engine.Application.prototype = {
  Update: function (delta) {
    this.stateContext.Update(delta);
    this.canvas.BeginDraw();
    this.stateContext.Draw(this.canvas.backBufferContext2D);
    this.canvas.EndDraw();
  },

  Initialize: function (defaultState, resWidth, resHeight) {
    this.canvas = new Engine.gameCanvas();
    this.timer = new Engine.GameTimer();
    Engine.keyboardInput.Initialize();
    this.canvas.Initialize("canvas", resWidth, resHeight);
    this.timer.updateObject = this;

    this.stateContext = new Engine.GameStateContext(defaultState);

    this.timer.Start();
  },
};
