import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

/**
 * Teacher route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {I18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Open the player with the specific currentLocation
     *
     * @function actions:playItem
     * @param {string} currentLocation - All the params for the currentLocation
     */
    studyPlayer: function(currentLocation) {
      const route = this;
      let role = ROLES.STUDENT;
      let source = PLAYER_EVENT_SOURCE.COURSE_MAP;
      let courseId = currentLocation.get('courseId');
      let classId = currentLocation.get('classId');
      let unitId = currentLocation.get('unitId');
      let lessonId = currentLocation.get('lessonId');
      let collectionId = currentLocation.get('collectionId');
      let collectionType = currentLocation.get('collectionType');
      let collectionSubType = currentLocation.get(
        'collection.collectionSubType'
      );
      let pathId = currentLocation.get('collection.pathId') || 0;
      let queryParams = {
        classId,
        unitId,
        lessonId,
        collectionId,
        role,
        source,
        type: collectionType,
        subtype: collectionSubType,
        pathId
      };

      let suggestionPromise = null;
      // Verifies if it is a suggested Collection/Assessment
      if (collectionSubType) {
        suggestionPromise = route
          .get('navigateMapService')
          .startSuggestion(
            courseId,
            unitId,
            lessonId,
            collectionId,
            collectionType,
            collectionSubType,
            pathId,
            classId
          );
      } else {
        suggestionPromise = route
          .get('navigateMapService')
          .startCollection(
            courseId,
            unitId,
            lessonId,
            collectionId,
            collectionType,
            classId
          );
      }

      suggestionPromise.then(() =>
        route.transitionTo('study-player', courseId, {
          queryParams
        })
      );
    },

    /**
     * Triggered when a teacher card menu item is selected
     * @param {string} item
     * @param {string} classId
     */
    selectMenuItem: function(item, classId) {
      const route = this;
      const queryParams = {
        queryParams: {
          filterBy: 'assessment'
        }
      };
      if (item === 'performance') {
        route.transitionTo('teacher.class.performance', classId, queryParams);
      } else if (item === 'course-map') {
        route.transitionTo('teacher.class.course-map', classId);
      } else if (item === 'class-activities') {
        route.transitionTo('teacher.class.class-activities', classId);
      } else {
        route.transitionTo('teacher-home');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function() {
    let route = this;
    const configuration = this.get('configurationService.configuration');

    //Steps for Take a Tour functionality
    let tourSteps = Ember.A([
      {
        elementSelector: '.gru-take-tour',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepOne.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepOne.description')
      },
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepTwo.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepTwo.description')
      },
      {
        elementSelector: '.gru-header .search-navbar-form',
        title: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepThree.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepThree.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .classrooms-link',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepFour.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepFour.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .content-link',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepFive.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepFive.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .library-link',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepSix.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepSix.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .profile-link',
        title: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepSeven.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepSeven.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .dropdown .profile-more',
        title: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepEight.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepEight.description')
      },
      {
        elementSelector: '.teacher-navigator .active-classes a',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepNine.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepNine.description')
      },
      {
        elementSelector: '.teacher-navigator .archived-classes a',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepTen.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepTen.description')
      },
      {
        elementSelector: '.content .gru-new-class-card',
        title: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepEleven.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.teacher-home.stepEleven.description')
      }
    ]);

    let myClassessPromise = Ember.RSVP.resolve(route.controllerFor('application').loadUserClasses());
    let firstCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let secondCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let thirdCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let fourthCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));

    const firstCourseId = configuration.get(
      'exploreFeaturedCourses.firstCourseId'
    );
    const secondCourseId = configuration.get(
      'exploreFeaturedCourses.secondCourseId'
    );
    const thirdCourseId = configuration.get(
      'exploreFeaturedCourses.thirdCourseId'
    );
    const fourthCourseId = configuration.get(
      'exploreFeaturedCourses.fourthCourseId'
    );
    var featuredCourses = Ember.A([]);

    if (firstCourseId) {
      firstCoursePromise = route.get('courseService').fetchById(firstCourseId);
    }
    if (secondCourseId) {
      secondCoursePromise = route
        .get('courseService')
        .fetchById(secondCourseId);
    }
    if (thirdCourseId) {
      thirdCoursePromise = route.get('courseService').fetchById(thirdCourseId);
    }
    if (fourthCourseId) {
      fourthCoursePromise = route
        .get('courseService')
        .fetchById(fourthCourseId);
    }

    return Ember.RSVP
      .hash({
        firstCourse: firstCoursePromise,
        secondCourse: secondCoursePromise,
        thirdCourse: thirdCoursePromise,
        fourthCourse: fourthCoursePromise,
        myClasses: myClassessPromise
      })
      .then(function(hash) {
        const firstFeaturedCourse = hash.firstCourse;
        const secondFeaturedCourse = hash.secondCourse;
        const thirdFeaturedCourse = hash.thirdCourse;
        const fourthFeaturedCourse = hash.fourthCourse;
        const myClasses = hash.myClasses;
        const myId = route.get('session.userId');
        const activeClasses = myClasses.getTeacherActiveClasses(myId);
        const archivedClasses = myClasses.getTeacherArchivedClasses();
        featuredCourses.push(firstFeaturedCourse);
        featuredCourses.push(secondFeaturedCourse);
        featuredCourses.push(thirdFeaturedCourse);
        featuredCourses.push(fourthFeaturedCourse);

        return {
          activeClasses,
          archivedClasses,
          featuredCourses,
          tourSteps
        };
      });
  },

  afterModel(resolvedModel) {
    let route = this;
    let activeClasses = resolvedModel.activeClasses;
    let classIds = activeClasses.mapBy('id');
    route
      .get('performanceService')
      .findClassPerformanceSummaryByClassIds(classIds)
      .then(function(classPerformanceSummaryItems) {
        activeClasses.forEach(function(activeClass) {
          let classId = activeClass.get('id');
          let courseId = activeClass.get('courseId');
          if (courseId) {
            route
              .get('courseService')
              .fetchByIdWithOutProfile(courseId)
              .then(course => {
                activeClass.set('course', course);
                activeClass.set('unitsCount', course.get('unitCount'));
              });
          }
          activeClass.set(
            'performanceSummary',
            classPerformanceSummaryItems.findBy('classId', classId)
          );
        });
      });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('steps', model.tourSteps);
    controller.set('featuredCourses', model.featuredCourses);
    controller.set('archivedClass', model.archivedClasses);
    controller.set('activeClasses', model.activeClasses);
  },

  /**
   * Reset controller properties
   */
  deactivate: function() {
    this.get('controller').resetValues();
  }
});
