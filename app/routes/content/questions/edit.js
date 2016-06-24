import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    collectionId:{},
    courseId: {},
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
      controller.set('courseId', undefined);
      controller.set('isCollection', undefined);
    }
  },



  // -------------------------------------------------------------------------
  // Methods

  model: function (params) {
    const route = this;
    const questionId = params.questionId;
    const collectionId = params.collectionId;
    const isCollection = params.isCollection === 'true';
    const isEditing = params.editing;

    var question = null;
    var collection = null;

    if (questionId) {
      question = route.get('questionService').readQuestion(questionId);
    }

    if (collectionId) {
      if (isCollection) {
        collection = route.get('collectionService').readCollection(collectionId);
      } else {
        collection = route.get('assessmentService').readAssessment(collectionId);
      }
    }

    return Ember.RSVP.hash({
      question: question,
      collection: collection,
      courseId: params.courseId,
      isCollection: isCollection,
      isEditing: !!isEditing
    });
  },

  setupController(controller, model) {
    const question = model.question;
    const collection = model.collection;
    const courseId = model.courseId;

    if (collection && courseId) {
      collection.set('courseId', courseId);
    }

    controller.set('question', question);
    controller.set('collection', collection);
    controller.set('isCollection', model.isCollection);
    controller.set('isEditing', model.isEditing);
    if(model.isEditing) {
      controller.set('tempQuestion', question.copy());
    }
  }
});
