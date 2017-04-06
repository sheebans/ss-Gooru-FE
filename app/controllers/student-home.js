import Ember from 'ember';
import {arrayChunks} from 'gooru-web/utils/utils';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Controller.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    copy: function () {  //Tengo q hacer esto pero cuando carga la pag...
      let localStorage = this.get('applicationController').getLocalStorage();
      const userId = this.get("session.userId");
      const showWelcomeMessage = userId+'_showWelcomeMessage';

      if(!localStorage.getItem(showWelcomeMessage)){
        this.send('showModal', 'content.modals.gru-welcome-message');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed('applicationController.myClasses.classes.[]', function(){
    return this.get("applicationController.myClasses").getStudentActiveClasses(this.get("profile.id"));
  }),

  /**
   * @property {Array[]}
   */
  activeClassesChunks: Ember.computed('activeClasses', function(){
    return arrayChunks(this.get("activeClasses"), 2);
  }),

  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed.alias('activeClasses.length'),

  /**
   * @property {Boolean} Indicate if the student has classes
   */
  hasClasses:Ember.computed('totalJoinedClasses',function(){
    return this.get('totalJoinedClasses') > 0;
  }),

  /**
   * @property {Class[]} Active classes for announcements
   */
  announcementsClasses:Ember.computed('activeClasses',function(){
    return this.get('activeClasses').slice(0,5);
  }),

  /**
   * @property {Boolean} Indicate if has more announcements to show
   */
  hasMoreAnnouncements:Ember.computed('activeClasses','announcementsClasses',function(){
    return this.get('activeClasses').length > this.get('announcementsClasses').length;
  })

});
