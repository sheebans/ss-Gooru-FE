import Ember from 'ember';
import Env from 'gooru-web/config/environment';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Controller.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  classService: Ember.inject.service('api-sdk/class'),

  applicationController: Ember.inject.controller('application'),

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showClasses: function (type) {
      this.set('showActiveClasses', type === 'active');
      this.set('showArchivedClasses', type === 'archived');
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init: function () {
    let localStorage = this.get('applicationController').getLocalStorage();
    const userId = this.get('session.userId');
    const localStorageItem = userId+'_dontShowWelcomeModal';

    if(!localStorage.getItem(localStorageItem)){
      this.send('showModal', 'content.modals.gru-welcome-message');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates when then active classes are visible
   * @property {boolean}
   */
  showActiveClasses: true,

  /**
   * Indicates when then archived classes are visible
   * @property {boolean}
   */
  showArchivedClasses: false,

  /**
   * A link to the parent application controller
   * @see controllers/application.js
   * @property {ClassesModel}
   */
  myClasses: Ember.computed.alias('applicationController.myClasses'),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed('applicationController.myClasses.classes.[]', function(){
    return this.get('applicationController.myClasses').getTeacherActiveClasses(this.get('profile.id'));
  }),

  /**
   * @property {Class[]}
   */
  archivedClasses: Ember.computed.filterBy('myClasses.classes', 'isArchived', true),

  /**
   * @property {Number} Total of teaching classes
   */
  totalTeachingClasses: Ember.computed.alias('activeClasses.length'),

  /**
   * @property {boolean} Indicates if there are classes
   */
  hasClasses: Ember.computed.bool('totalTeachingClasses'),

  /**
   * Toolkit site url
   * @property {string}
   */
  toolkitSiteUrl: Ember.computed(function(){
    return Env.toolkitSiteUrl;
  }),
  /**
   * Reset to default values
   */
  resetValues: function() {
    this.set('showActiveClasses',true);
  }
});
