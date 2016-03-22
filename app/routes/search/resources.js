import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    term: {
      refreshModel: true
    }
  },

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function(params) {
    var resourceResults = this.get('searchService').searchResources(params.term, []);
    return Ember.RSVP.hash({
      resources: resourceResults
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
  }

  // -------------------------------------------------------------------------
  // Actions

});
