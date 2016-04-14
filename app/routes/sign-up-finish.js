import Ember from "ember";

export default Ember.Route.extend({

  /**
   * @property {Ember.Service} Service to do retrieve countries
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  model: function() {
    var countries = this.get("lookupService").readCountries();

    return Ember.RSVP.hash({
      countries: countries
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
  }
});
