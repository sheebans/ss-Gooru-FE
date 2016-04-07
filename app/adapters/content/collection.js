import Ember from 'ember';

/**
 * Adapter to support the Collection CRUD operations in the API 3.0
 *
 * @typedef {Object} CollectionAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/collections',

  /**
   * Posts a new collection
   *
   * @param data collection data to be sent in the request body
   * @returns {Promise}
   */
  createCollection: function(data) {
    const adapter = this;
    const url = this.get('namespace');
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
