import Ember from "ember";

export default Ember.Route.extend({

  /**
   * @property {Ember.Service} Service to do retrieve countries
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service("session"),

  beforeModel: function() {
    if (this.get('session.isAnonymous') || !this.get('session.userData.isNew')) {
      this.transitionTo('index');
    }
  },

  model: function() {
    const route = this;
    return route.get("lookupService").readCountries()
      .then(function(countries) {
        var usCountry = countries.findBy("code", 'US');
        var usStates = route.get("lookupService").readStates(usCountry.id);
        return Ember.RSVP.hash({
          countries: countries,
          states: usStates
        });
      });
  },

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set("countries", model.countries);
    controller.set('states', model.states);
  }
});
