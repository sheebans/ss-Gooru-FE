import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Student home route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, ConfigurationMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  analyticsService: Ember.inject.service("api-sdk/analytics"),

  performanceService: Ember.inject.service("api-sdk/performance"),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods
  model: function () {
    let route = this;
    const configuration = this.get('configurationService.configuration');

    //Steps for Take a Tour functionality
    const tourSteps = Ember.A([
      {
        elementSelector: '.gru-take-tour',
        title: route.get('i18n').t('gru-take-tour.student-home.stepOne.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepOne.description')
      },
      {
        elementSelector: '.student-navigator .active-classes a',
        title: route.get('i18n').t('gru-take-tour.student-home.stepFour.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepFour.description')
      },
      {
        elementSelector: '.student-navigator .actions .join-class-cta',
        title: route.get('i18n').t('gru-take-tour.student-home.stepFive.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepFive.description')
      },
      /*{ INDEPENDING LEARNING
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepSix.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepSix.description')
      },*/
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepEight.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepEight.description')
      },
      {
        elementSelector: '.gru-header .search-navbar-form',
        title: route.get('i18n').t('gru-take-tour.student-home.stepSeven.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepSeven.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .library-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepNine.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepNine.description')
      },
      /*{
        elementSelector: '.gru-header .menu-navbar .performance-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepTen.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepTen.description')
      },*/
      {
        elementSelector: '.gru-header .profile-link .profile',
        title: route.get('i18n').t('gru-take-tour.student-home.stepThirteen.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepThirteen.description')
      },
      {
        title: route.get('i18n').t('gru-take-tour.student-home.stepFourteen.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepFourteen.description')
      }
    ]);

    let myClasses = route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor("application").get("myClasses"); //after login the variable is refreshed at the controller
    let firstCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let secondCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    const myId = route.get("session.userId");
    const firstCourseId = configuration.get("exploreFeaturedCourses.firstCourseId");
    const secondCourseId = configuration.get("exploreFeaturedCourses.secondCourseId");
    const activeClasses = myClasses.getStudentActiveClasses(myId);

    if (firstCourseId) {
      firstCoursePromise = route.get('courseService').fetchById(firstCourseId);
    }
    if (secondCourseId) {
      secondCoursePromise = route.get('courseService').fetchById(secondCourseId);
    }

    return Ember.RSVP.hash({
      firstCourse: firstCoursePromise,
      secondCourse: secondCoursePromise
    }).then(function (hash) {
      const firstFeaturedCourse = hash.firstCourse;
      const secondFeaturedCourse = hash.secondCourse;

      return {
        activeClasses,
        firstFeaturedCourse,
        secondFeaturedCourse,
        tourSteps
      };
    });
  },

  afterModel(resolvedModel) {
    let route = this;
    let activeClasses = resolvedModel.activeClasses;
    let classIds = activeClasses.mapBy("id");
    let myId = route.get("session.userId");

    Ember.RSVP.hash({
      classPerformanceSummaryItems: route.get("performanceService")
        .findClassPerformanceSummaryByStudentAndClassIds(myId, classIds),
      classesLocation: route.get("analyticsService").getUserCurrentLocationByClassIds(classIds, myId, true)
    }).then(function(hash){
      const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
      const classesLocation = hash.classesLocation;
      activeClasses.forEach(function (activeClass) {
        const classId = activeClass.get("id");
        activeClass.set("currentLocation", classesLocation.findBy("classId", classId));
        activeClass.set("performanceSummary", classPerformanceSummaryItems.findBy("classId", classId));
      });
    });
  },

  setupController: function(controller, model) {
    controller.set('steps', model.tourSteps);
    controller.set('firstFeaturedCourse', model.firstFeaturedCourse);
    controller.set('secondFeaturedCourse', model.secondFeaturedCourse);
  }

});
