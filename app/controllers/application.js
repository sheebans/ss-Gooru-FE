import Ember from "ember";

export default Ember.Controller.extend({

  queryParams: ['themeId'],

  session: Ember.inject.service("session"),

  /**
   * @property {string} application theme
   */
  themeId: null,

  /**
   * @property {GruTheme} application theme
   */
  theme: null,

  /**
   * @property theme style tag
   */
  themeStyleTag: function(){
    const themeStylesUrl = this.get("theme.stylesUrl");
    return themeStylesUrl  ? `<link rel="stylesheet" type="text/css" href="${themeStylesUrl}">` : '';
  }.property("theme.stylesUrl"),


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
