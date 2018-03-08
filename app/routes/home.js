import Ember from 'ember';

export default Ember.Route.extend({
  // Methods
  // -------------------------------------------------------------------------

  beforeModel: function() {
    this.transitionTo('student-home');
  }
});
