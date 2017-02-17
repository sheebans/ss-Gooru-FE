import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions

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


