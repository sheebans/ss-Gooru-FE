import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    term: {
      refreshModel: true
    }
  },

  setupController: function(controller) {
    controller.resetProperties();
    controller.get('parentController').selectMenuItem('content');
  },

  // -------------------------------------------------------------------------
  // Events
  resetController(controller, isExiting) {
    var queryParams = controller.get('queryParams');
    queryParams.forEach(function (param) {
      controller.set(param, null);
    });
  }

});
