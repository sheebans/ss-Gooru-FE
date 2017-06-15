import Ember from "ember";
import { formatDate } from 'gooru-web/utils/utils';
/**
 * Class activities controller
 *
 * Controller responsible of the logic for the teacher class activities tab
 */

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Class controller
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service("api-sdk/class-activity"),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * @function actions:changeVisibility
     */
    changeVisibility: function(classActivityId) {
      const controller = this;
      const currentClass = controller.get('classController.class');
      const classId = currentClass.get("id");
      const date = new Date();
      controller.get('classActivityService').enableClassActivity(classId, classActivityId, date).then(function() {
        const classActivity = controller.get('classActivities')[0].classActivities.findBy("id", classActivityId);
        classActivity.set('date', date);
      });
    },

    /**
     *
     * @function actions:viewMore
     */
    viewMore: function () {
      const controller = this;
      const currentClass = controller.get('classController.class');
      const year = controller.get('year');
      const month = controller.get('month');
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      controller.get('classActivityService').findClassActivities(currentClass.get("id"), undefined, startDate, endDate).then(function(classActivities) {
        controller.get('classActivities').push({
          classActivities: classActivities,
          date: formatDate(startDate, 'MMMM, YYYY')
        });
        if((month - 1) >= 0) {
          controller.set('month', month - 1);
        } else {
          controller.set('month', 11);
          controller.set('year', year - 1);
        }
        controller.notifyPropertyChange('classActivities');
      });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Contains classActivity objects
   * @property {classActivity[]} classActivities
   */
  classActivities: null,

  /**
   * Contains current month
   * @property {int} month
   */
  month: null,

  /**
   * Contains current year
   * @property {int} year
   */
  year: null

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

});
