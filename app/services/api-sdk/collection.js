import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SessionMixin from '../../mixins/session';

export default Ember.Service.extend(StoreMixin, SessionMixin, {

  findById: function(collectionId) {
    return this.get('store').findRecord('collection/collection', collectionId, { reload: true });
  }

});
