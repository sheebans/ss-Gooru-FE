import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: {
    classId: {
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model(params) {
    return {
      classId: params.classId
    };
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.get('parentController').selectMenuItem('about');
    controller.set('profile', model.profile);
    controller.set('parentController.classId', model.classId);
  }
});
