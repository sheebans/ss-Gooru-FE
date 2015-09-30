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
  /**
   * @property {string} on check role option action
   */
  onCheckRoleOptionAction: "onCheckRoleOption",

  actions: {
    onAuthenticate: function(){
      this.sendAction("onAuthenticateAction");
    },

    onSelectDateOfBirthAction: function(dateValue) {
      this.sendAction("onSelectDateOfBirthAction", dateValue);
    },

    onCheckRoleOptionAction: function(optionValue) {
      this.sendAction("onCheckRoleOptionAction", optionValue);
    },
  }

});
