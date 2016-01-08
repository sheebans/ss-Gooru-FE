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
     It is necessary to pass the query params again on the transitionTo so it doesn't fail at refresh

     There is an ember problem when refreshing a child route using query params...
     At refresh it will enter first at the performance route before model (parent route),
     then base on the user role, we would do a transition to the child route (again) stopping
     the original child route initiated when refreshing, ember throws this error
     TypeError: Cannot read property 'name' of undefined
       at _emberRuntimeSystemObject.default.extend.actions.finalizeQueryParamChange (ember.debug.js:25264)
       at Object.triggerEvent (ember.debug.js:27476)

     */
    const aClass = this.modelFor('class').class;
    const route = this;
    if (!aClass.isTeacher(this.get("session.userId"))){
      route.transitionTo('class.analytics.performance.student',
        { queryParams: route.paramsFor("class.analytics.performance.student")});
    }
  }
});
