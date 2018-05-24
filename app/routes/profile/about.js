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
    let route = this;
    return {
      classId: params.classId,
      profile: route.modelFor('profile').profile
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
