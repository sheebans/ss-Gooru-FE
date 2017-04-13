import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import ContextMixin from "gooru-web/mixins/quizzes/context";
import QuizzesReport from 'quizzes-addon/routes/reports/student-context';
import { ROLES } from 'gooru-web/config/config';

/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default QuizzesReport.extend(PrivateRouteMixin, ContextMixin, {

  templateName: 'reports/student-context',

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service("api-sdk/user-session"),

  /**
   * @property {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  /**
   * @property {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  performanceService: Ember.inject.service("api-sdk/performance"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    goBack: function() {
      const route = this;
      const controller = route.get("controller");
      const context = controller.get("context");
      let toRoute = controller.get("backUrl");
      if (context.get("lessonId")){
        if (controller.get("isTeacher")) {
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
    this.studentCollectionModel(params);
  },

  /**
   * Take the user back to data page
   */
  backToData: function () {
    const route = this;
    const controller = route.get("controller");
    const context = controller.get("context");

    route.transitionTo("class.analytics.performance.student", context.get("classId"),
    {
      queryParams: {
        unitId: context.get("unitId"),
        lessonId: context.get("lessonId")
      }
    });
  },

  /**
   * Take the user back to course map page
   */
  backToCourseMap: function () {
    const route = this;
    const controller = route.get("controller");
    const context = controller.get("context");
    const unitId = context.get("unitId");
    const lessonId = context.get("lessonId");
    route.transitionTo("class.overview", context.get("classId"),
    {
      queryParams: {
        location: `${unitId}+${lessonId}`
      }
    });
  },

  /**
   * @param {{ assessmentId: string, resourceId: string }} params
   */
  studentCollectionModel: function (params) {
    const route = this;
    const collectionId = params.collectionId;
    const contextId = params.contextId;
    const type = params.type || 'collection';
    const role = params.role || ROLES.TEACHER;

    const isCollection = type === 'collection';
    const isAssessment = type === 'assessment';

    const loadAssessment = !type || isAssessment;
    const loadCollection = !type || isCollection;

    let collection;

    return Ember.RSVP.hashSettled({
      assessment: loadAssessment ? route.get('assessmentService').readAssessment(collectionId) : false,
      collection: loadCollection ? route.get('collectionService').readCollection(collectionId) : false
    }).then(function(hash) {
      let collectionFound = (hash.assessment.state === 'rejected') || (hash.assessment.value === false);
      collection = collectionFound ? hash.collection.value : hash.assessment.value;
      return contextId ? { id: contextId } : route.createContext(params, collection, params.role === ROLES.STUDENT);
    }).then(function({ id }) {
      params.profileId = route.get('session.userData.gooruUId');
      params.type = collection.get('collectionType');
      params.contextId = id;
      params.role = role;
      return route.quizzesModel(params);
    });
  },

  setupController(controller, model) {
    if (model){
      controller.set('collection', model.collection);
      controller.set('attemptData', model.attemptData);
    }
  }
});
