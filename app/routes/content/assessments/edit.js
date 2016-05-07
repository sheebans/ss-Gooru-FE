import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    courseId:{}
  },

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  assessmentService: Ember.inject.service('api-sdk/assessment'),

  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Events
  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('courseId', undefined);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var assessment = this.get('assessmentService').readAssessment(params.assessmentId);

    var course = null;

    if(params.courseId){
      course = this.get('courseService').fetchById(params.courseId);
    }

    return Ember.RSVP.hash({
      assessment: assessment,
      course:course
    });
  },

  setupController(controller, model) {

    // Since assessment is a collection with only questions, we'll reuse the same components
    // for collections (for example, see: /app/components/content/assessments/gru-assessment-edit.js)
    // and that is why the property 'collection' is being reused here, too.
    controller.set('collection', model.assessment);
    controller.set('course', model.course);
  }

});
