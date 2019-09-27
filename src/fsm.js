class FSM {
  constructor(config) {
    if (!config) {
      throw new Error();
    }
    this.config = config;
    this.options = ["normal", "busy", "hungry", "sleeping"];
    this.index = 0;
    this.state = ["normal"];
    this.error = false;
  }

  getState() {
    return this.state[this.index];
  }

  changeState(state) {
    if (this.options.includes(state)) {
      this.state = this.state.slice(0, this.index + 1);
      this.state.push(state);
      this.index++;
    } else {
      throw new Error();
    }
  }

  trigger(event) {
    if (!this.error) {
      switch (event) {
        case "initial":
          this.state.push(this.config.initial);
          this.index++;
          break;
        case "study":
          this.state = this.state.slice(0, this.index + 1);
          this.state.push(this.config.states.normal.transitions.study);
          this.index++;
          break;
        case "hungry":
        case "eat":
          this.state = this.state.slice(0, this.index + 1);
          this.state.push(this.config.states.hungry.transitions.eat);
          this.index++;
          break;
        case "get_tired":
          this.state = this.state.slice(0, this.index + 1);
          this.state.push(this.config.states.busy.transitions.get_tired);
          this.index++;
          break;
        case "get_hungry":
          this.state = this.state.slice(0, this.index + 1);
          this.state.push(this.config.states.busy.transitions.get_hungry);
          this.index++;
          break;
        case "get_up":
          this.state.splice(0, this.index + 1);
          this.state.push(this.config.states.busy.transitions.get_up);
          this.index++;
          break;
        default:
          this.error = true;
          throw new Error();
      }
    } else {
      throw new Error();
    }
  }

  reset() {
    this.state = ["normal"];
    this.index = 0;
  }

  getStates(event) {
    if (!event) {
      return this.options;
    }
    const options = [];
    Object.keys(this.config.states).forEach(key => {
      const obj = this.config.states[key].transitions;
      if (event in obj) {
        options.push(key);
      }
    });
    return options;
  }

  undo() {
    if (this.index > 0) {
      this.index--;
      return true;
    }
    return false;
  }

  redo() {
    if (this.index < this.state.length - 1) {
      this.index++;
      return true;
    }
    return false;
  }

  clearHistory() {
    this.state = ["normal"];
    this.index = 0;
  }
}

const config = {
  initial: "normal",
  states: {
    normal: {
      transitions: {
        study: "busy"
      }
    },
    busy: {
      transitions: {
        get_tired: "sleeping",
        get_hungry: "hungry"
      }
    },
    hungry: {
      transitions: {
        eat: "normal"
      }
    },
    sleeping: {
      transitions: {
        get_hungry: "hungry",
        get_up: "normal"
      }
    }
  }
};

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
