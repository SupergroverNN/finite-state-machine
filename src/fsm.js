class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (!config) {
      throw new Error();
    }
    this.config = config;
    this.trigger = "initial";
    this.options = ["normal", "busy", "sleeping", "hungry"];
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    let params = "";
    switch (this.trigger) {
      case "initial":
        params = this.config.initial;
        break;
      case "study":
        params = this.config.states.normal.transitions.study;
        break;
    }
    return params;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    if (this.options.includes(state)) {
      this.config.initial = state;
    } else {
      throw new Error();
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {}

  /**
   * Resets FSM state to initial.
   */
  reset() {}

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {}

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {}

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {}

  /**
   * Clears transition history
   */
  clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
