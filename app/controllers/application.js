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

  /**
   * This dependency is here so that the header search input is linked to the controller
   * @property {SearchController}
   */
  searchController: Ember.inject.controller('search'),


  setupGlobalErrorHandling: Ember.on('init', function () {
    const controller = this;

    // Ultimately all server and javascript errors will be caught by this handler
    Ember.onerror = function (error) {
      const errorMessage = controller.get('i18n').t('common.unexpectedError').string;
      controller.get('notifications').error(errorMessage);
      controller.get('logService').logError(error);
    };

  }),

  setupAjaxRequests: Ember.on('init', function () {
    Ember.$.ajaxSetup({cache: false});
  }),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['themeId'],

  /**
   * @property {string} application theme
   */
  themeId: null,

  /**
   * This is a link to the search controller so the header is updated
   * @property {string} term
   */
  term: Ember.computed.alias("searchController.term"),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered after a user has signed in
     * @see sign-in.hbs
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
  theme: null,

  /**
   * @property {ClassesModel} list of user classes
   */
  myClasses: null

});
