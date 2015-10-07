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
   * @property {string} on search action
   */
  onSearchAction: "onSearchAction",

  /**
   * Search term
   * @property {string}
   */
  term: null,

  actions: {

    onAuthenticate: function () {
      this.sendAction("onAuthenticateAction");
    },

    onSearch: function () {
      this.sendAction("onSearchAction", this.get("term"));
    }


  }

});
