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
  /**
   * @property {string} on select date of birth action
   */
  onSelectDateOfBirthAction: "onSelectDateOfBirth",

  actions: {
    onAuthenticate: function(){
      this.sendAction("onAuthenticateAction");
    },

    onSelectDateOfBirthAction: function(dateValue) {
      this.sendAction("onSelectDateOfBirthAction", dateValue);
    }
  }

});
