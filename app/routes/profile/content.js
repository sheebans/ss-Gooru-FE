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
  }

});
