import Ember from "ember";

/**
 * Application header component
 * @see application.hbs
 *
 *
 * @module
 * @typedef {object} AppHeader
 */
export default Ember.Component.extend({

  /**
   * @property {object} current session
   */
  currentSession: null,

  /**
   * @property {string} on authenticate action
   */
  onAuthenticateAction: "onAuthenticate",

  /**
   * @property {string} on invalidate session action
   */
  onInvalidateSessionAction: "onInvalidateSession",

  /**
   * @property {string} on close modal action
   */
  onCloseModalAction: "onCloseModal",

  actions: {
    onAuthenticate: function(){
      this.sendAction("onAuthenticateAction");
    },

    onInvalidateSession: function() {
      this.sendAction("onInvalidateSessionAction");
    },

    onCloseModalAction: function() {
      this.sendAction("onCloseModalAction");
    }
  }

});
