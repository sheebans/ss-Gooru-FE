import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

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
  }

});
