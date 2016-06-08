import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    collectionId:{},
    isCollection:{},
    editing:{}
  },
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/question
   */
  questionService: Ember.inject.service("api-sdk/question"),

  /**
  * @requires service:api-sdk/assessment
  */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Events
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('collectionId', undefined);
      controller.set('isCollection', undefined);
    }
  },



  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var question = this.get('questionService').readQuestion(params.questionId);
    var collection = null;
    var isCollection = false;
    var isEditing = params.editing;

    if(params.collectionId){
      if(params.isCollection==="true"){
        isCollection = true;
        collection = this.get('collectionService').readCollection(params.collectionId);
      }else{
        collection = this.get('assessmentService').readAssessment(params.collectionId);
      }
    }

    return Ember.RSVP.hash({
      question: question,
      collection:collection,
      isCollection:isCollection,
      isEditing: !!isEditing
    });
  },

  setupController(controller, model) {
    var question = model.question;

    controller.set('question', question);
    controller.set('collection', model.collection);
    controller.set('isCollection', model.isCollection);
    controller.set('isEditing', model.isEditing);
    if(model.isEditing) {
      controller.set('tempQuestion', question.copy());
    }
  }
});
