import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  profileService: Ember.inject.service('api-sdk/profile'),

  sessionService: Ember.inject.service('api-sdk/session'),

  /**
   * Inject proficiency controller to get class id
   */
  proficiencyController: Ember.inject.controller('profile/proficiency'),

  aboutController: Ember.inject.controller('profile/about'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    toggleFollowingStatus() {
      const controller = this;

      if (this.get('session.isAnonymous')) {
        this.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        if (controller.get('profile.isFollowing')) {
          controller
            .get('profileService')
            .unfollowUserProfile(controller.get('profile.id'))
            .then(function() {
              controller
                .get('profileService')
                .readUserProfile(controller.get('profile.id'))
                .then(function(updatedProfile) {
                  controller.set('profile', updatedProfile);
                });
            });
        } else {
          controller
            .get('profileService')
            .followUserProfile(controller.get('profile.id'))
            .then(function() {
              controller
                .get('profileService')
                .readUserProfile(controller.get('profile.id'))
                .then(function(updatedProfile) {
                  controller.set('profile', updatedProfile);
                });
            });
        }
      }
    },

    /**
     * Action triggered when the user click back button
     * Redirect the user into class management page
     */
    onClickBackButton() {
      let controller = this;
      let classId = controller.get('proficiencyController.classId');
      let id = controller.get('aboutController.classId');
      if (classId || id) {
        controller.transitionToRoute(
          `/teacher/class/${classId ? classId : id}/class-management`
        );
      } else {
        let currntUser = controller.get('currentLoginUser');
        if (currntUser.get('role') === 'teacher') {
          controller.transitionToRoute('/teacher-home');
        } else if (currntUser.get('role') === 'student') {
          controller.transitionToRoute('/student-home');
        }
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates if the user is seeing his own profile
   * @property {isMyProfile}
   * @see {Class} profile
   * @returns {bool}
   */
  isMyProfile: Ember.computed('profile', function() {
    return this.get('profile').get('id') === this.get('currentUserId');
  }),

  /**
   * Property to check whethere the current user is anonymous or not
   */
  isAnonymousUser: Ember.computed('profile', function() {
    return this.get('currentUserId') === 'anonymous';
  }),

  /**
   * Current user id
   */
  currentUserId: Ember.computed.alias('session.userId'),

  /**
   * The profile presented to the user
   * @property {Profile}
   */
  profile: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,

  /**
   * @type {Object}
   * Property to store currently logged in user data
   */
  currentLoginUser: null,

  // -------------------------------------------------------------------------
  // Observers

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
