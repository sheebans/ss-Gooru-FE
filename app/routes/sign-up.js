import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.createRecord('sign-up');
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {
    signUp: function() {
      var self = this;
      this.controller.get('model').save().then(
        function() {
          self.transitionTo('index');
        });
    }
  }

});
