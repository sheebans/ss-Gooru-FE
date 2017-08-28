import Ember from 'ember';
import Context from 'gooru-web/models/result/context';
/**
 *
 * Summary data report of Rubric Grading for an OE Question
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service('api-sdk/user-session'),

  /**
   * @type {RubricService} Service to retrieve rubric information
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  /**
   * @type {ProfileService} Service to retrieve question information
   */
  questionService: Ember.inject.service('api-sdk/question'),

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function(params) {
    const route = this;
    const context = route.getContext(params);
    const classId = params.classId;
    const courseId = params.courseId;
    const collectionId = params.collectionId;
    const questionId = params.questionId;
    const sessionId = params.sessionId;
    const studentId = params.studentId;

    const questionPromise = route
      .get('questionService')
      .readQuestion(questionId);
    const summaryPromise = route
      .get('rubricService')
      .getRubricQuestionSummary(
        studentId,
        classId,
        courseId,
        collectionId,
        questionId,
        sessionId
      );

    return Ember.RSVP.hash({
      question: questionPromise,
      context: context,
      summary: summaryPromise
    });
  },

  afterModel: function(model) {
    const route = this;
    const context = model.context;
    const questionId = model.question.get('id');
    const session = context.get('sessionId');

    const performanceService = route.get('performanceService');
    return performanceService
      .findAssessmentResultByCollectionAndStudent(context, session)
      .then(function(assessmentResult) {
        const questionResults = assessmentResult.resourceResults;
        const questionResult = questionResults.findBy('resourceId', questionId);
        model.questionResult = questionResult;
      });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('question', model.question);
    controller.set('rubric', model.question.get('rubric'));
    controller.set('questionSummary', model.summary);
    controller.set('context', model.context);
    controller.set('questionResult', model.questionResult);
  },

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params) {
    const collectionType = params.collectionType || 'collection';
    const classId = params.classId;
    const courseId = params.courseId;
    const collectionId = params.collectionId;
    const sessionId = params.sessionId;
    const userId = params.studentId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    return Context.create({
      collectionType,
      userId,
      collectionId,
      courseId,
      classId,
      sessionId,
      unitId,
      lessonId
    });
  }
});
