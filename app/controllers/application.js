import Ember from "ember";

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * This dependency is here so that the header search input is linked to the controller
   * @property {SearchController}
   */
  searchController: Ember.inject.controller('search'),

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

  classService: Ember.inject.service("api-sdk/class"),


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
  isInvalidSearchTerm:false,
  setInvalidSearchTerm: function(value){
    this.set('isInvalidSearchTerm', value);
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
  myClasses: null,

  /**
   * @property {Profile}
   */
  profile: null,

  // -------------------------------------------------------------------------
  // Methods

  loadUserClasses: function() {
    const controller = this;
    const profile = controller.get('profile');
    let profilePromise = (profile) ? Ember.RSVP.resolve(profile) : controller.get('profileService').readUserProfile(controller.get("session.userId"));

    return profilePromise.then(function(userProfile) {
      controller.set('profile', userProfile);
      return controller.get('classService').findMyClasses(userProfile)
        .then(function(classes) {
        controller.set('myClasses', classes);
        return classes;
      });
    });
  }
});
