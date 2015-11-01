import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  searchCollections: function(params) {
    return this.get('store').queryRecord('search/collection-result', {
      q: params.term,
      length: 8,
      start: 1,
      includeCIMetaData: true,
      category: 'All',
      'flt.collectionType': 'collection'
    });
  },

});
