import Ember from "ember";

export default Ember.Route.extend({

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service("session"),

  beforeModel: function() {
    if (!this.get('session.isAnonymous')) {
      this.transitionTo('index');
    }
  }
});
