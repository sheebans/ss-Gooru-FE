import Ember from 'ember';

export default Ember.Route.extend({


  setupController(controller) {
    controller.loadStudentsData();
  },
  
  resetController(controller) {
    controller.set('studentsList', Ember.A([]));
  }
});
