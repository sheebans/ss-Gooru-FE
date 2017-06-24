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
  // Actions
  actions: {

    /**
     * Remove a bookmark from a list of bookmarks
     */
    removeBookmark: function (bookmark) {
      this.get('bookmarks').removeObject(bookmark);
    },

    /**
     * Triggered when the expand/collapse arrows are selected.
     */
    togglePanel: function () {
      this.set('toggleState', !this.get('toggleState'));
    }
  },


  // -------------------------------------------------------------------------
  // Events

  init: function () {
    let localStorage = this.get('applicationController').getLocalStorage();
    const userId = this.get('session.userId');
    const localStorageLogins = userId + '_logins';
    let loginCount = localStorage.getItem(localStorageLogins);
    if(loginCount) {
      this.set('loginCount', +loginCount);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed('applicationController.myClasses.classes.[]', function(){
    return this.get('applicationController.myClasses').getStudentActiveClasses(this.get('profile.id'));
  }),
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
  bookmarks: null
});
