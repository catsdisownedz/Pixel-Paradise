// State pattern implementation for game states
Engine.GameStateContext = function (defaultState) {
  this.State = null;

  if (defaultState != null) {
    this.State = defaultState;
    this.State.Enter();
  }
};

Engine.GameStateContext.prototype = {
  ChangeState: function (newState) {
    if (this.State != null) {
      this.State.Exit();
    }
    this.State = newState;
    this.State.Enter();
  },

  Update: function (delta) {
    this.State.CheckForChanges(this);
    this.State.Update(delta);
  },

  Draw: function (delta) {
    this.State.Draw(delta);
  },
};

Engine.GameState = function () { };

Engine.GameState.prototype = {
  Enter: function () {},
  Exit: function () {},
  Update: function (delta) {},
  Draw: function (context) {},
  CheckForChanges: function (context) {},
};
