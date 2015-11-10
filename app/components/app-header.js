import Ember from "ember";
import SessionMixin from '../mixins/session';
import ModalMixin from '../mixins/modal';

/**
 * Application header component
 * @see application.hbs
 *
 *
 * @module
 * @typedef {object} AppHeader
 */
export default Ember.Component.extend(SessionMixin, ModalMixin, {

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

  /**
   * Validate if the property term have the correct number of characters
   * @property
   */
  isIncorrectTermSize : Ember.computed.lt('term.length',3),

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
