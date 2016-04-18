import Ember from 'ember';
import Assessment from 'gooru-web/models/content/assessment';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  assessmentService: Ember.inject.service('api-sdk/assessment'),

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },
  setupController(controller /*, model */) {

    // TODO: Fetch data from model
    var assessment = Assessment.create(Ember.getOwner(this).ownerInjection(), {
      title: "Assessment Title",
      category: 1,
      audience: [2, 4],
      learningObjectives: "Learning Objectives"
    });

    controller.set('collection', assessment);
  }

});
