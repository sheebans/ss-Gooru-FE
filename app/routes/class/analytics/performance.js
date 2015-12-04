import Ember from 'ember';

/**
 * Analytics Performance Route
 *
 * Route responsible of the transitions for the student and teacher performance
 *
 * @module
 * @see routes/analytics/performance/student.js
 * @augments ember/Controller
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
    //TODO check if it is a teacher so it transitions to class.analytics.performance.teacher
    this.transitionTo('class.analytics.performance.student');
  },

  setupController: function(){
    this.send("selectMenuItem", 'analytics.performance', false);
  }

});
