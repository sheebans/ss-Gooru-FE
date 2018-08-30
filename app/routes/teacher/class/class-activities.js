import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {Service} session service
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Number of records loaded past date
   * @type {Number}
   */
  numberRecordsLoadedPastDate: 30,

  /**
   * Number of records loaded future date
   * @type {Number}
   */
  numberRecordsLoadedFutureDate: 30,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Launch an assessment on-air
     *
     * @function actions:goLive
     */
    goLive: function(collectionId) {
      const currentClass = this.modelFor('teacher.class').class;
      const classId = currentClass.get('id');
      const queryParams = {
        queryParams: {
          source: PLAYER_EVENT_SOURCE.DAILY_CLASS
        }
      };
      this.transitionTo(
        'reports.collection',
        classId,
        collectionId,
        queryParams
      );
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const route = this;
    const currentClass = route.modelFor('teacher.class').class;
    const classId = currentClass.get('id');
    const numberRecordsLoadedPastDate = route.get(
      'numberRecordsLoadedPastDate'
    );
    const numberRecordsLoadedFutureDate = route.get(
      'numberRecordsLoadedFutureDate'
    );
    let startDate = moment()
      .subtract(numberRecordsLoadedPastDate, 'd')
      .format('YYYY-MM-DD');
    let endDate = moment()
      .add(numberRecordsLoadedFutureDate, 'd')
      .format('YYYY-MM-DD');
    return Ember.RSVP.hash({
      classActivities: route
        .get('classActivityService')
        .findClassActivities(classId, null, startDate, endDate)
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('showWelcome', true);
    controller.parseClassActivityData(model.classActivities);
  },

  /**
   * Reset data on deactive
   * @param controller
   */
  resetController(controller) {
    controller.set('classActivities', Ember.A([]));
  }
});
