import Ember from 'ember';
import Context from 'gooru-web/models/result/context';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service('api-sdk/user-session'),

  /**
   * @property {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @property {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  performanceService: Ember.inject.service('api-sdk/performance'),


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    goBack: function() {
      const route = this;
      const controller = route.get('controller');
      const context = controller.get('context');
      let toRoute = controller.get('backUrl');
      if (context.get('lessonId')){
        if (controller.get('isTeacher')) {
          toRoute ? route.transitionTo(toRoute) : route.backToCourseMap();
        }
        else {
          route.backToData();
        }
      }
      else {
        toRoute = toRoute || 'index'; //index when refreshing the page, TODO fix
        route.transitionTo(toRoute);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ assessmentId: string, resourceId: string }} params
   */
  model(params) {
    const route = this;
    const context = route.getContext(params);
    const type = params.type || 'collection';

    const lessonPromise = context.get('courseId') ?
      route.get('lessonService').fetchById(context.get('courseId'), context.get('unitId'), context.get('lessonId')) :
      null;

    const isCollection = (type === 'collection');
    const collectionPromise = (isCollection) ?
      route.get('collectionService').readCollection(params.collectionId) :
      route.get('assessmentService').readAssessment(params.collectionId);
    const completedSessionsPromise = (isCollection) ? [] :
      route.get('userSessionService').getCompletedSessions(context);
    return Ember.RSVP.hash({
      collection: collectionPromise,
      completedSessions : completedSessionsPromise,
      lesson: lessonPromise,
      context: context
    });
  },

  afterModel: function (model){
    const controller = this;
    const context = model.context;
    var completedSessions = model.completedSessions;
    const totalSessions = completedSessions.length;
    const session = totalSessions ? completedSessions[totalSessions - 1] : null;

    if (session){ //collections has no session
      context.set('sessionId', session.sessionId);
    }
    const performanceService = controller.get('performanceService');
    const loadStandards = session && context.get('isInContext');
    return performanceService.findAssessmentResultByCollectionAndStudent(context, loadStandards)
      .then(function(assessmentResult) {
        model.assessmentResult = assessmentResult;
      });
  },

  /**
   *
   * @param controller
   * @param model
   * @returns {Promise.<T>}
   */
  setupController: function(controller, model){
    controller.set('collection', model.collection.toPlayerCollection());
    controller.set('lesson', model.lesson);
    controller.set('completedSessions', model.completedSessions);
    controller.set('context', model.context);
    controller.setAssessmentResult(model.assessmentResult);
  },

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params){
    const route = this;
    let userId = route.get('session.userId');
    const role = params.role;
    if (role === 'teacher'){
      /*
        for teachers, it could be the teacher playing a collection or a teacher seeing its students report
        for student should use always the session id
       */
      userId = params.userId || userId;
    }
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    return Context.create({
      collectionType: params.type,
      userId: userId,
      collectionId: collectionId,
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId
    });
  },

  /**
   * Take the user back to data page
   */
  backToData: function () {
    const route = this;
    const controller = route.get('controller');
    const context = controller.get('context');

    route.transitionTo('student.class.performance', context.get('classId'),
    {
      queryParams: {
        filterBy: 'assessment'
      }
    });
  },

  /**
   * Take the user back to course map page
   */
  backToCourseMap: function () {
    const route = this;
    const controller = route.get('controller');
    const context = controller.get('context');
    const unitId = context.get('unitId');
    const lessonId = context.get('lessonId');
    route.transitionTo('class.overview', context.get('classId'),
    {
      queryParams: {
        location: `${unitId}+${lessonId}`
      }
    });
  },

  deactivate: function(){
    this.get('controller').resetValues();
  }


});
