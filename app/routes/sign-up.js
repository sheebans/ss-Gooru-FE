import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.createRecord('sign-up');
  },

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
