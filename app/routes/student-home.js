import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Student home route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  analyticsService: Ember.inject.service("api-sdk/analytics"),

  performanceService: Ember.inject.service("api-sdk/performance"),

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

    //Steps for Take a Tour functionality
    const tourSteps = Ember.A([
      {
        elementSelector: '.gru-take-tour',
        title: route.get('i18n').t('gru-take-tour.student-home.stepOne.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepOne.description')
      },
      {
        elementSelector: '.student-landing .announcements',
        title: route.get('i18n').t('gru-take-tour.student-home.stepTwo.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepTwo.description')
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
        elementSelector: '.gru-header .search-navbar-form',
        title: route.get('i18n').t('gru-take-tour.student-home.stepSeven.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepSeven.description')
      },
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepEight.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepEight.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .library-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepNine.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepNine.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .performance-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepTen.title'),
        description: route.get('i18n').t('gru-take-tour.student-home.stepTen.description')
      },
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
    const myId = route.get("session.userId");
    const activeClasses = myClasses.getStudentActiveClasses(myId);
    const classIds = activeClasses.mapBy("id");

    return Ember.RSVP.hash({
      classPerformanceSummaryItems: route.get("performanceService").findClassPerformanceSummaryByStudentAndClassIds(myId, classIds),
      classesLocation: route.get("analyticsService").getUserCurrentLocationByClassIds(classIds, myId, true)
    }).then(function(hash){
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        const classesLocation = hash.classesLocation;
        const promises = activeClasses.map(function (aClass) {
          const classId = aClass.get("id");
          aClass.set("currentLocation", classesLocation.findBy("classId", classId));
          aClass.set("performanceSummary", classPerformanceSummaryItems.findBy("classId", classId));
        });
        return Ember.RSVP.hash({
          promises: promises,
          steps: tourSteps
        });
      });
  },

  setupController: function(controller, model) {
    controller.set('steps', model.steps);
  }
});
