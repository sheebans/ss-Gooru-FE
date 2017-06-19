import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events

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
  featuredCourses: null
});
