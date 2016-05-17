import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  questionService: Ember.inject.service("api-sdk/question"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var question = this.get('questionService').readQuestion(params.questionId);

    return Ember.RSVP.hash({
      question: question
    });
  },

  setupController(controller, model) {
    controller.set('question', model.question);
  }

});
