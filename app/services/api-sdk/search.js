import Ember from 'ember';
import SearchSerializer from 'gooru-web/serializers/search/search';
import SearchAdapter from 'gooru-web/adapters/search/search';

export default Ember.Service.extend({

  searchSerializer: null,

  searchAdapter: null,


  init: function () {
    this._super(...arguments);
    this.set('searchSerializer', SearchSerializer.create());
    this.set('searchAdapter', SearchAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  searchCollections: function(term, isTypeAssessment = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchCollections(term, isTypeAssessment)
        .then(function(response) {
          resolve(service.get('searchSerializer').normalizeSearchCollections(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  searchResources: function(term, categories) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchResources(term, categories)
        .then(function(response) {
          resolve(service.get('searchSerializer').normalizeSearchResources(response));
        }, function(error) {
          reject(error);
      });
    });
  }

});
