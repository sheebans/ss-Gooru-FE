import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import ContextMixin from 'gooru-web/mixins/quizzes/context';
import QuizzesPlayer from 'quizzes-addon/routes/player';
import { ROLES } from 'gooru-web/config/config';

/**
 * @typedef { Ember.Route } PlayerRoute
 *
 * @module
 * @augments ember/Route
 */
export default QuizzesPlayer.extend(ModalMixin, ConfigurationMixin, ContextMixin, {

  templateName: 'player',

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Ember.Service} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),
  /**
   * @property {Ember.Service} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @type {UnitService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {LessonService} Service to retrieve unit information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @property {Ember.Service} session service
   */
  session: Ember.inject.service('session'),


  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * When closing the player
     */
    closePlayer: function(){
      const $appContainer = Ember.$( '.app-container' );
      if ($appContainer.hasClass( 'navigator-on' )){
        $appContainer.removeClass( 'navigator-on' );
      }
      var route = !this.get('history.lastRoute.name') ? 'index' : this.get('history.lastRoute.url');
      this.transitionTo(route);
    },

    /**
     * When the submission is complete
     */
    onFinish: function() {
      let controller = this.get('controller');
      let queryParams = {
        collectionId: controller.get('collection.id'),
        type: controller.get('type'),
        role: controller.get('role'),
        classId: controller.get('classId'),
        contextId: controller.get('contextResult.contextId')
      };
      this.transitionTo(
        'reports.student-collection',
        { queryParams }
      );
    },

    startAssessment: function(){
      const controller = this.get('controller');
      controller.startAssessment();
    },

    /**
     * Navigates to the assessment report
     */
    navigateToReport: function (){
      const route = this;
      const controller = route.get('controller');
      let context = controller.get('context');
      let collection = controller.get('collection');
      const queryParams = {
        collectionId: context.get('collectionId'),
        userId: controller.get('session.userId'),
        type: collection.get('collectionType'),
        role: controller.get('role')
      };
      if (context.get('classId')) {
        queryParams.classId = context.get('classId');
        queryParams.courseId = context.get('courseId');
        queryParams.unitId = context.get('unitId');
        queryParams.lessonId = context.get('lessonId');
      }

      const reportController = route.controllerFor('reports.student-collection');

        //this doesn't work when refreshing the page, TODO
      reportController.set('backUrl', route.get('history.lastRoute.url'));
      route.transitionTo('reports.student-collection', { queryParams: queryParams});
    },

    /**
     * On navigator remix collection button click
     * @param {Collection} collection
     */
    remixCollection: function (collection) {
      var remixModel = {
        content: collection
      };
      if(collection.get('isCollection')) {
        this.send('showModal', 'content.modals.gru-collection-remix', remixModel);
      } else {
        this.send('showModal', 'content.modals.gru-assessment-remix', remixModel);
      }
    }

  },

  // -------------------------------------------------------------------------
  // Properties

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const route = this;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const collectionId = params.collectionId;
    const type = params.type;
    const isLesson = params.isLesson;
    const courseStarted = params.courseStarted;
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
      return route.createContext(params, collection, role === ROLES.STUDENT);
    }).then(function({ id }) {
      params.profileId = route.get('session.userData.gooruUId');
      params.role = role;
      params.type = collection.get('collectionType');
      params.contextId = id;

      if(courseId && unitId && lessonId){
        return route.get('courseService').fetchById(courseId)
          .then(function(course) {
            return route.get('unitService').fetchById(courseId, unitId)
              .then(function (unit) {
                return route.get('lessonService').fetchById(courseId, unitId, lessonId)
                  .then(function (lesson) {
                    return route.quizzesModel(params).then(hash => Object.assign(hash, {
                      classId: params.classId,
                      course: course,
                      unit: unit,
                      lesson: lesson,
                      isLesson,
                      courseStarted
                    }));
                  });
              });
          });
      }

      return route.quizzesModel(params).then(hash => Object.assign(hash, { classId: params.classId, isLesson, courseStarted }));

    });
  },

  setupController(controller, model) {
    let collection = model.collection;
    const isAnonymous = model.isAnonymous;
    const isTeacher = model.role === 'teacher';

    const isLesson = JSON.parse(model.isLesson);
    const courseStarted = JSON.parse(model.courseStarted);

    controller.set('showConfirmation', !isLesson && !(collection.get('isCollection') || isAnonymous || isTeacher));
    controller.set('isTeacher',isTeacher);
    controller.set('isAnonymous',isAnonymous);
    controller.set('classId', model.classId);
    controller.set('isLesson',isLesson);
    controller.set('courseStarted',courseStarted);
    controller.set('course', model.course);
    controller.set('unit', model.unit);
    controller.set('lesson', model.lesson);
    this._super(...arguments);
  }
});
