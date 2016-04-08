import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    this.transitionTo('profile.content.courses');
  },

  setupController: function(controller) {
    controller.get('parentController').selectMenuItem('content');
  }

});
