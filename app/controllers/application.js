import Ember from "ember";

export default Ember.Controller.extend({

  session: Ember.inject.service("session"),

  actions: {
    /**
     * Action triggered after a user has signed in
     * @see gru-sign-in.hbs
     */
    signIn: function() {
      return true;
    },

    /**
     * Action triggered when logging out
     */
    logout: function() {
      return true;
    },

    /**
     * Action triggered when the user searches for collections
     * @see application.hbs
     * @see gru-header.js
     */
    searchTerm: function() {
      return true;
    }
  }


});
