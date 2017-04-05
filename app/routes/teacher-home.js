import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Teacher route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  performanceService: Ember.inject.service("api-sdk/performance"),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service("api-sdk/course"),

  /**
   * @type {I18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function() {
    let route = this;

    //Steps for Take a Tour functionality
    let tourSteps = Ember.A([
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepOne.title'),
        description: route.get('i18n').t('gru-take-tour.teacher-home.stepOne.description')
      },
      {
        elementSelector: '.teacher-navigator .active-classes a',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepTwo.title'),
        description: route.get('i18n').t('gru-take-tour.teacher-home.stepTwo.description')
      },
      {
        elementSelector: '.teacher-navigator .actions .create-class-cta',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepThree.title'),
        description: route.get('i18n').t('gru-take-tour.teacher-home.stepThree.description')
      },
      {
        elementSelector: '.gru-header .profile-link .profile',
        title: route.get('i18n').t('gru-take-tour.teacher-home.stepFour.title'),
        description: route.get('i18n').t('gru-take-tour.teacher-home.stepFour.description')
      }
    ]);

    let myClasses = route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor("application").get("myClasses"); //after login the variable is refreshed at the controller
    const myId = route.get("session.userId");
    const activeClasses = myClasses.getTeacherActiveClasses(myId);

    return Ember.RSVP.hash({
      activeClasses: activeClasses,
      tourSteps: tourSteps,
    });
  },

  afterModel(resolvedModel) {
    let route = this;
    let activeClasses = resolvedModel.activeClasses;
    let classIds = activeClasses.mapBy("id");

    route.get("performanceService").findClassPerformanceSummaryByClassIds(classIds)
      .then(function (classPerformanceSummaryItems) {
        activeClasses.forEach(function (activeClass) {
          let classId = activeClass.get("id");
          let courseId = activeClass.get('courseId');
          if (courseId) {
            route.get('courseService').fetchById(courseId).then((course) => {
              activeClass.set('unitsCount', course.get('unitCount'));
            });
          }
          activeClass.set("performanceSummary", classPerformanceSummaryItems.findBy("classId", classId));
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
  }

});
