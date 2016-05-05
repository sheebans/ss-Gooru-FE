import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    collectionId:{}
  },
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/question
   */
  questionService: Ember.inject.service("api-sdk/question"),
  /**
  * @requires service:api-sdk/collection
  */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var question = this.get('questionService').readQuestion(params.questionId);

    var assessment = null;

    if(params.collectionId){
      assessment = this.get('assessmentService').readAssessment(params.collectionId);
    }

    return Ember.RSVP.hash({
      question: question,
      assessment:assessment
    });
  },

  setupController(controller, model) {

    controller.set('question', model.question);

    controller.set('assessment', model.assessment);
  }
});
