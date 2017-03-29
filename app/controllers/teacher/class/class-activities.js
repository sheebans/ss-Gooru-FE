import Ember from "ember";
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
    changeVisibility: function (classActivityId) {
      const controller = this;
      const currentClass = controller.get('classController.class');
      const classId = currentClass.get("id");
      const date = new Date();
      controller.get('classActivityService').enableClassActivity(classId, classActivityId, date).then(function(){
        const classActivity = controller.get('classActivities').findBy("id", classActivityId);
        classActivity.set('date', date);
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
  classActivities: null

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

});
