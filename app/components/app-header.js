import Ember from 'ember';

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
   * @property {object} user
   */
  user: null,
  /**
   * @property {string} on authenticate action
   */
  onAuthenticateAction: "onAuthenticate",

  actions: {
    onAuthenticate: function(){
      this.sendAction("onAuthenticateAction");
    }
  }

});
