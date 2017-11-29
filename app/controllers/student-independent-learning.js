import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    let localStorage = this.get('applicationController').getLocalStorage();
    const userId = this.get('session.userId');
    const localStorageLogins = `${userId}_logins`;
    let loginCount = localStorage.getItem(localStorageLogins);
    if (loginCount) {
      this.set('loginCount', +loginCount);
    }
  },

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('menuItem');
    this.selectItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed(
    'applicationController.myClasses.classes.[]',
    function() {
      return this.get(
        'applicationController.myClasses'
      ).getStudentActiveClasses(this.get('profile.id'));
    }
  ),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed.alias('activeClasses.length'),

  /*
   * @property {Array[]} - featuredCourses
   */
  featuredCourses: null,

  /**
   * @property {Number} - Amount of logins by the user
   */
  loginCount: null,

  /*
   * @property {Array[]} - bookmarks
   */
  bookmarks: null,

  /**
   * @property {Number} firstRowLimit of bookmarks in the planel
   */
  firstRowLimit: 9,


  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: Ember.computed(function() {
    let currentHref = window.location.href;
    let currentPage = currentHref.substring(currentHref.lastIndexOf('/') + 1);
    if (currentPage !== "bookmarks"){
      return "current-study";
    }
    return currentPage;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item) {
    this.set('menuItem', item);
  }
});
