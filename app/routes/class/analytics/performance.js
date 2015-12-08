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
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
    const aClass = this.modelFor('class').class;
    if (aClass.isTeacher(this.get("session.userId"))){
      this.transitionTo('class.analytics.performance.teacher');
    }
    else {
      this.transitionTo('class.analytics.performance.student');
    }
  },

  setupController: function(){
    this.send("selectMenuItem", 'analytics.performance', false);
  }

});
