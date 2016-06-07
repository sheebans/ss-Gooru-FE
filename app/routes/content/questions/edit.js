import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    collectionId:{},
    isCollection:{},
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

  model: function (params) {
    var question = this.get('questionService').readQuestion(params.questionId);

    var collection = null;

    var isCollection = false;

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
      isCollection:isCollection
    });
  },

  setupController(controller, model) {

    controller.set('question', model.question);

    controller.set('collection', model.collection);

    controller.set('isCollection', model.isCollection);
  }
});
