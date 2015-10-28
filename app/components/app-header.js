import Ember from "ember";
import SessionMixin from '../mixins/session';

/**
 * Application header component
 * @see application.hbs
 *
 *
 * @module
 * @typedef {object} AppHeader
 */
export default Ember.Component.extend(SessionMixin, {

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

    onInvalidateSession: function() {
      this.sendAction("onInvalidateSessionAction");
    },

    onCloseModalAction: function() {
      this.sendAction("onCloseModalAction");
    },

    onSearch: function () {
      this.sendAction("onSearchAction", this.get("term"));
    }

  }

});
