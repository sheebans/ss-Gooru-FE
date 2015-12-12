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
    /*
     There is an ember problem when refreshing a child route using query params...
     At refresh it will enter first at the performance route before model (parent route),
     then base on the user role, we would do a transition to the child route (again) stopping
     the original child route initiated when refreshing, ember throws this error
     TypeError: Cannot read property 'name' of undefined
       at _emberRuntimeSystemObject.default.extend.actions.finalizeQueryParamChange (ember.debug.js:25264)
       at Object.triggerEvent (ember.debug.js:27476)

     So on refresh we are not performing the transition since it is going there anyways
     */
    if (this.get("history.empty")){ //no history
      return;
    }

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
