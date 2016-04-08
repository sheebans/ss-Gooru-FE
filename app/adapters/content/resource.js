import Ember from 'ember';

/**
 * Adapter to support the Resource CRUD operations in the API 3.0
 *
 * @typedef {Object} ResourceAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/resources',

  /**
   * Posts a new resource
   *
   * @param data resource data to be sent in the request body
   * @returns {Promise}
   */
  createResource: function(data) {
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
