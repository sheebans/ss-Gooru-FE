import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
import {
  hasSuggestions,
  createStudyPlayerQueryParams,
  currentLocationToMapContext
} from 'gooru-web/utils/navigation-util';

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    refresh: {
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  analyticsService: Ember.inject.service('api-sdk/analytics'),
  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item) {
      const route = this;
      const controller = route.get('controller');
      const currentItem = controller.get('menuItem');

      if (item !== currentItem) {
        controller.selectMenuItem(item);
        const queryParams = {
          queryParams: {
            filterBy: 'assessment'
          }
        };

        if (item === 'performance') {
          route.transitionTo('student.class.performance', queryParams);
        } else if (item === 'course-map') {
          route.transitionTo('student.class.course-map');
        } else if (item === 'class-activities') {
          route.transitionTo('student.class.class-activities');
        } else if (item === 'study-player') {
          route.studyPlayer(controller.get('classmodel').currentLocation);
        } else if (item === 'profile') {
          route.transitionTo('student.class.profile');
        }
      }
    }
  },
  /**
   * Open the player with the specific currentLocation
   *
   * @function actions:playItem
   * @param {string} currentLocation - All the params for the currentLocation
   * @summary
   * 1.  Current location null or Empty > Next call with 'continue' (continue on courseId, classId ) > Study player
   * 1.1 Handle suggestions when 'continue' and there is a teacher suggestion > Send suggestion to study player (should prompt for start dialog )
   * 2.  Current location with status not complete > NO next call, launch study player directly
   * 3.  Current location with status complete. Next call with 'content-served' (start on courseId, classId, pathId, pathType, ...  +SCORE) > Study Player
   * 3.1 Handle suggestions when 'content-served' and there is a suggestion > Send suggestion to Study Player (should prompt for accept/ignore dialog )
   */
  studyPlayer: function(currentLocation) {
    const route = this;
    const controller = route.get('controller');
    const navMapServc = route.get('navigateMapService');
    let options = {
        role: ROLES.STUDENT,
        source: PLAYER_EVENT_SOURCE.COURSE_MAP,
        courseId: controller.get('course').id,
        classId: controller.get('class').id
      },
      nextPromise = null;
    if (currentLocation == null || currentLocation === '') {
      nextPromise = navMapServc.continueCourse(
        options.courseId,
        options.classId
      ); //Complete
    } else if (currentLocation.get('status') === 'complete') {
      //content_served
      nextPromise = navMapServc.contentServedResource(
        currentLocationToMapContext(currentLocation)
      );
    } else {
      // Next not required, get the params from current location
      nextPromise = route.nextPromiseHandler(
        currentLocationToMapContext(currentLocation)
      );
    }

    nextPromise.then(route.nextPromiseHandler).then(parsedOptions => {
      return route.launchStudyPlayer(parsedOptions);
    });
  },

  /** returns options promise chain resolving response
   * @param
   */
  nextPromiseHandler(resp) {
    let queryParams = {
      role: ROLES.STUDENT,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      courseId: hasSuggestions(resp) ? resp.context.courseId : resp.courseId // Only in case of suggestions we dont have courseId in suggestion
    };
    queryParams = createStudyPlayerQueryParams(
      hasSuggestions(resp) ? resp.suggestions[0] : resp.context || resp,
      queryParams
    );
    return Ember.RSVP.resolve(queryParams);
  },

  /**
   * launches study player
   * @param options {object} is the queryParams required to launch study-player
   */
  launchStudyPlayer(queryParams) {
    console.log('launchStudyPlayer', queryParams); //eslint-disable-line
    const route = this;
    route.transitionTo('study-player', queryParams.courseId, { queryParams });
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function(params) {
    const route = this;
    const myId = route.get('session.userId');

    //Steps for Take a Tour functionality
    let tourSteps = Ember.A([
      {
        title: route.get('i18n').t('gru-take-tour.student-class.stepOne.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepOne.description')
      },
      {
        elementSelector: '.student .classroom-information',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepTopBar.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepTopBar.description')
      },
      {
        elementSelector: '.gru-class-navigation .nav-tabs .class-activities',
        title: route.get('i18n').t('gru-take-tour.student-class.stepTwo.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepTwo.description')
      },
      {
        elementSelector: '.gru-class-navigation .nav-tabs .course-map',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepThree.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepThree.description')
      },
      {
        elementSelector: '.gru-class-navigation .nav-tabs .performance',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFour.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFour.description')
      },
      {
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFive.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFive.description')
      }
    ]);

    const classId = params.classId;
    const classPromise = route.get('classService').readClassInfo(classId);

    const membersPromise = route.get('classService').readClassMembers(classId);

    return classPromise.then(function(classData) {
      let classCourseId = null;
      if (classData.courseId) {
        classCourseId = Ember.A([
          { classId: params.classId, courseId: classData.courseId }
        ]);
      }
      const performanceSummaryPromise = classCourseId
        ? route
          .get('performanceService')
          .findClassPerformanceSummaryByStudentAndClassIds(
            myId,
            classCourseId
          )
        : null;
      return Ember.RSVP.hash({
        class: classPromise,
        members: membersPromise,
        classPerformanceSummaryItems: performanceSummaryPromise
      }).then(function(hash) {
        const aClass = hash.class;
        const members = hash.members;
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        let classPerformanceSummary = classPerformanceSummaryItems
          ? classPerformanceSummaryItems.findBy('classId', classId)
          : null;
        aClass.set('performanceSummary', classPerformanceSummary);
        const courseId = aClass.get('courseId');
        let visibilityPromise = Ember.RSVP.resolve([]);
        let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));

        if (courseId) {
          visibilityPromise = route
            .get('classService')
            .readClassContentVisibility(classId);
          coursePromise = route.get('courseService').fetchById(courseId);
        }

        //Pass courseId as query param for student current location
        let locationQueryParam = {
          courseId
        };
        var userLocationPromise = route
          .get('analyticsService')
          .getUserCurrentLocation(classId, myId, locationQueryParam);

        return Ember.RSVP.hash({
          contentVisibility: visibilityPromise,
          course: coursePromise,
          currentLocation: userLocationPromise
        }).then(function(hash) {
          const contentVisibility = hash.contentVisibility;
          const course = hash.course;
          var currentLocation = hash.currentLocation;
          aClass.set('owner', members.get('owner'));
          aClass.set('collaborators', members.get('collaborators'));
          aClass.set('members', members.get('members'));
          aClass.set('currentLocation', currentLocation);
          return Ember.RSVP.hash({
            class: aClass,
            course: course,
            members: members,
            units: course.get('children') || [],
            contentVisibility: contentVisibility,
            tourSteps: tourSteps,
            currentLocation: currentLocation
          });
        });
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('class', model.class);
    controller.set('course', model.course);
    controller.set('units', model.units);
    controller.set('contentVisibility', model.contentVisibility);
    controller.set('steps', model.tourSteps);
    controller.set('classmodel', model);
  }
});
