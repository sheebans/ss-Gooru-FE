import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SessionMixin from '../../mixins/session';

export default Ember.Service.extend(StoreMixin, SessionMixin, {

  /**
   * Find a collection by identifier
   * @param {string} collectionId
   * @returns {Collection|Promise}
   */
  findById: function(collectionId) {
    return this.get('store').findRecord('collection/collection', collectionId, { reload: true });
  }

});
