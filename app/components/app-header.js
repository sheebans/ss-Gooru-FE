import Ember from 'ember';

/**
 * Application header component
 * @see application.hbs
 *
 *
 * @class
 */
export default Ember.Component.extend({

  /**
   * @property {User} current user
   */
  user: null,

  /**
   * @property {string} on authenticate action
   */
  onAuthenticateAction: "onAuthenticate",

  actions: {
    onAuthenticate: function(){
      this.sendAction("onAuthenticateAction")
    }
  }

});
