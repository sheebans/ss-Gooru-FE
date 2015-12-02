import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function() {
    this.send("selectMenuItem", 'overview');
  }
});
