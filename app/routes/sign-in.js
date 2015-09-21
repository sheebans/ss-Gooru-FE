import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.createRecord('sign-in');
  },

  actions: {

    signIn: function() {
      var self = this;
      this.controller.get('model').save().then(
        function() {
          //var session = self.store.peekRecord('session', model.id);
          self.transitionTo('index');
          //self.transitionTo('index', session);
        });
    },

    // clear a potentially stale error message from previous login attempts
    setupController: function(controller, model) {
      controller.set('errorMessage', null);
    }
  }


});
