import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function(params) {
    const selectedOptionTypes = params.selectedOptionTypes;
    const term = this.paramsFor('search').term;
    var resourceResults = this.get('searchService').searchResources(term, selectedOptionTypes);
    return Ember.RSVP.hash({
      term:term,
      resources: resourceResults,
      selectedOptionTypes: selectedOptionTypes
    });
  },

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('resourceResults', model.resources);
    controller.set('selectedOptionTypes', model.selectedOptionTypes);
    controller.set('term', model.term);
  }

});
