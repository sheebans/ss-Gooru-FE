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

    const tourSteps = Ember.A([
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-tour.home.stepOne.title'),
        description: route.get('i18n').t('gru-tour.home.stepOne.description')
      },
      {
        elementSelector: '.teacher-navigator .active-classes a',
        title: route.get('i18n').t('gru-tour.home.stepTwo.title'),
        description: route.get('i18n').t('gru-tour.home.stepTwo.description')
      },
      {
        elementSelector: '.teacher-navigator .actions .create-class-cta',
        title: route.get('i18n').t('gru-tour.home.stepFour.title'),
        description: route.get('i18n').t('gru-tour.home.stepFour.description')
      },
      {
        elementSelector: '.gru-header .profile-link .profile',
        title: route.get('i18n').t('gru-tour.home.stepFive.title'),
        description: route.get('i18n').t('gru-tour.home.stepFive.description')
      }
    ]);

    let myClasses = route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor("application").get("myClasses"); //after login the variable is refreshed at the controller
    const myId = route.get("session.userId");
    const activeClasses = myClasses.getTeacherActiveClasses(myId);
    const classIds = activeClasses.mapBy("id");

    return route.get("performanceService").findClassPerformanceSummaryByClassIds(classIds)
      .then(function(classPerformanceSummaryItems){
        activeClasses.forEach(function (aClass) {
          const classId = aClass.get("id");
          aClass.set("performanceSummary", classPerformanceSummaryItems.findBy("classId", classId));
        });
        return Ember.RSVP.hash({
          classPerformanceSummaryItems: classPerformanceSummaryItems,
          tourSteps: tourSteps
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
    const activeClasses = controller.get('activeClasses');
    let courseId;

    activeClasses.forEach((aClass) => {
      courseId = aClass.get('courseId');
      if(courseId){
        this.get('courseService').fetchById(courseId).then((course) => {
          aClass.set('unitsCount', course.get('unitCount'));
        });
      }
    });
  }
});
