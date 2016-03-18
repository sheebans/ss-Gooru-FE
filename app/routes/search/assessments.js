import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    this._super(controller, model);
    var term = controller.get('searchController').term;
    var searchParams = {
          "term": term,
          "collectionType": 'assessments'
        };

    var collectionResults = this.get('searchService').searchCollections(searchParams);

    controller.set('collectionResults', collectionResults);
  }

  // -------------------------------------------------------------------------
  // Actions

});
