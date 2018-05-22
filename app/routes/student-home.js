import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import {
  ROLES,
  PLAYER_EVENT_SOURCE
} from 'gooru-web/config/config';

/**
 * Student home route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  analyticsService: Ember.inject.service('api-sdk/analytics'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @dependency {i18nService} Service to retrieve translations information
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
        route.transitionTo('study-player', courseId, { queryParams })
      );
    },

    /**
     * Triggered when a student card menu item is selected
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
        route.transitionTo('student.class.performance', classId, queryParams);
      } else if (item === 'course-map') {
        route.transitionTo('student.class.course-map', classId);
      } else if (item === 'class-activities') {
        route.transitionTo('student.class.class-activities', classId);
      } else {
        route.transitionTo('student-home');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  model: function() {
    let route = this;
    const configuration = this.get('configurationService.configuration');

    //Steps for Take a Tour functionality
    const tourSteps = Ember.A([
      {
        elementSelector: '.gru-take-tour',
        title: route.get('i18n').t('gru-take-tour.student-home.stepOne.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepOne.description')
      },
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepTwo.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTwo.description')
      },
      {
        elementSelector: '.gru-header .search-navbar-form',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThree.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThree.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .study-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepFour.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFour.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .library-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepFive.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFive.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .profile-link',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepSeven.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepSeven.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .dropdown .profile-more',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEight.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEight.description')
      },
      {
        elementSelector: '.student-left-panel .featured-courses',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFeaturedCourses.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFeaturedCourses.description')
      },
      {
        elementSelector: '.student-navigator .active-classes a',
        title: route.get('i18n').t('gru-take-tour.student-home.stepTen.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTen.description')
      },
      {
        elementSelector: '.student-navigator .independent-learning a',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEleven.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEleven.description')
      },
      {
        elementSelector: '.content .gru-join-class-card',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTwelve.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTwelve.description')
      },
      {
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThirteen.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThirteen.description')
      }
    ]);

    let myClasses =
      route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor('application').get('myClasses'); //after login the variable is refreshed at the controller
    let firstCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let secondCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let thirdCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let fourthCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    const myId = route.get('session.userId');
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
    const activeClasses = myClasses.getStudentActiveClasses(myId);
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
        fourthCourse: fourthCoursePromise
      })
      .then(function(hash) {
        const firstFeaturedCourse = hash.firstCourse;
        const secondFeaturedCourse = hash.secondCourse;
        const thirdFeaturedCourse = hash.thirdCourse;
        const fourthFeaturedCourse = hash.fourthCourse;

        featuredCourses.push(firstFeaturedCourse);
        featuredCourses.push(secondFeaturedCourse);
        featuredCourses.push(thirdFeaturedCourse);
        featuredCourses.push(fourthFeaturedCourse);

        return {
          activeClasses,
          featuredCourses,
          tourSteps
        };
      });
  },

  afterModel(resolvedModel) {
    let route = this;
    let activeClasses = resolvedModel.activeClasses;
    let classIds = activeClasses.mapBy('id');
    let myId = route.get('session.userId');

    Ember.RSVP
      .hash({
        classPerformanceSummaryItems: route
          .get('performanceService')
          .findClassPerformanceSummaryByStudentAndClassIds(myId, classIds),
        classesLocation: route
          .get('analyticsService')
          .getUserCurrentLocationByClassIds(classIds, myId, true)
      })
      .then(function(hash) {
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        const classesLocation = hash.classesLocation;
        activeClasses.forEach(function(activeClass) {
          const classId = activeClass.get('id');
          activeClass.set(
            'currentLocation',
            classesLocation.findBy('classId', classId)
          );
          activeClass.set(
            'performanceSummary',
            classPerformanceSummaryItems.findBy('classId', classId)
          );
        });
      });
  },

  setupController: function(controller, model) {
    controller.set('steps', model.tourSteps);
    controller.set('featuredCourses', model.featuredCourses);
  },

  /**
   * Before leaving the route
   */
  deactivate: function() {
    this.controller.set('isLoading', false);
  }
});
