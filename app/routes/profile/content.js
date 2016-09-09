import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller) {
    controller.resetProperties();
    controller.get('parentController').selectMenuItem('content');
  }

});
