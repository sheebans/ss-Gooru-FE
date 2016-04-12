import Ember from 'ember';

export default Ember.Controller.extend({


  courses: null,

  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile')

});
