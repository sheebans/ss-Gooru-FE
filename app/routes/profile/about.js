import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function() {
    // TODO: We have to remove this later. This is only for testing course component.
    return this.get('courseService').findById('d0b56322-d3ca-40f5-85b3-2f38ef910ac1');
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('course', model);
    controller.get('parentController').selectMenuItem('about');
  }

});
