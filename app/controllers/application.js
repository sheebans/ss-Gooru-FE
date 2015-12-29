import Ember from "ember";

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:api-sdk/log
   */
  logService: Ember.inject.service("api-sdk/log"),

  setupGlobalErrorHandling: Ember.on('init', function () {
    const controller = this;

    // Ultimately all server and javascript errors will be caught by this handler
    Ember.onerror = function (error) {
      const errorMessage = controller.get('i18n').t('common.unexpectedError').string;
      controller.get('notifications').error(errorMessage);
      controller.get('logService').logError(error);
    };

  }),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['themeId'],

  /**
   * @property {string} application theme
   */
  themeId: null,

  // -------------------------------------------------------------------------
  // Actions

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
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {GruTheme} application theme
   */
  theme: null

});
