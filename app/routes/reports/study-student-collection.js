import Ember from 'ember';
import StudentCollection from 'gooru-web/routes/reports/student-collection';

/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default StudentCollection.extend({
  templateName: 'reports/study-student-collection',

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

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
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ assessmentId: string, resourceId: string }} params
   */
  model(params) {
    let route = this;
    let courseId = params.courseId;
    let unitId = params.unitId;
    let lessonId = params.lessonId;
    let navigateMapService = route.get('navigateMapService');
    let studentCollectionModel;
    //Steps for Take a Tour functionality
    const tourSteps = Ember.A([
      {
        title: route.get('i18n').t('gru-take-tour.study-player.stepOne.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepOne.description')
      },
      {
        elementSelector: '.header-panel .course-map',
        title: route.get('i18n').t('gru-take-tour.study-player.stepTwo.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepTwo.description')
      },
      {
        elementSelector: '.header-panel .content-title',
        title: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepThree.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepThree.description')
      },
      {
        elementSelector: '.header-panel .suggest-player',
        title: route.get('i18n').t('gru-take-tour.study-player.stepFour.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepFour.description')
      },
      {
        elementSelector:
          '.header-panel .performance-completion-take-tour-info .completion',
        title: route.get('i18n').t('gru-take-tour.study-player.stepFive.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepFive.description')
      },
      {
        elementSelector:
          '.header-panel  .performance-completion-take-tour-info .performance',
        title: route.get('i18n').t('gru-take-tour.study-player.stepSix.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepSix.description')
      },
      {
        elementSelector: '.qz-player-footer .reaction-bar',
        title: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepSeven.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepSeven.description')
      },
      {
        title: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepEight.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.study-player.stepEight.description')
      }
    ]);
    return route
      .studentCollectionModel(params)
      .then(collectionModel => {
        studentCollectionModel = collectionModel;
        return Ember.RSVP.hash({
          course: route.get('courseService').fetchById(courseId),
          unit: route.get('unitService').fetchById(courseId, unitId),
          lesson: route
            .get('lessonService')
            .fetchById(courseId, unitId, lessonId),
          mapLocation: navigateMapService.getStoredNext()
        });
      })
      .then(function(hash) {
        // Set the correct unit sequence number
        hash.course.children.find((child, index) => {
          let found = false;
          if (child.get('id') === hash.unit.get('id')) {
            found = true;
            hash.unit.set('sequence', index + 1);
          }
          return found;
        });

        // Set the correct lesson sequence number
        hash.unit.children.find((child, index) => {
          let found = false;
          if (child.get('id') === hash.lesson.get('id')) {
            found = true;
            hash.lesson.set('sequence', index + 1);
          }
          return found;
        });
        return Object.assign(studentCollectionModel, hash, {
          tourSteps: tourSteps
        });
      });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties({
      steps: model.tourSteps,
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      mapLocation: model.mapLocation,
      profile: model.profile
    });
  },

  deactivate: function() {
    this.get('controller').resetValues();
  }
});
