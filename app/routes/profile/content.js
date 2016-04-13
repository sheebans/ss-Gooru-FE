import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {

  },

  setupController: function(controller) {
    controller.get('parentController').selectMenuItem('content');
  }

});
