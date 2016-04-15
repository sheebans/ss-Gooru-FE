import Ember from 'ember';

export default Ember.Controller.extend({



  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Content/Course[]} courses
   */
  courses: null

});
