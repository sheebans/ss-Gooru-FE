import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SearchSerializer from 'gooru-web/serializers/search/search';
import SearchAdapter from 'gooru-web/adapters/search/search';

export default Ember.Service.extend(StoreMixin, {

  searchSerializer: null,

  searchAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('searchSerializer', SearchSerializer.create());
    this.set('searchAdapter', SearchAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  searchCollections: function(params) {
    if(Object.keys(params).length) {
      return this.get('store').queryRecord('search/collection-result', {
        category: 'All',
        'flt.collectionType': (params.collectionType)?params.collectionType:'collection',
        includeCIMetaData: true,
        length: 20,
        q: params.term,
        start: 1
      });
    } else {
      return Ember.A();
    }
  },

  searchResources: function(term, categories) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('searchAdapter').searchResources(term, categories)
        .then(function(response) {
          resolve(service.get('searchSerializer').normalizeSearchResource(response));
        }, function(error) {
          reject(error);
      });
    });
  }

});
