import Ember from 'ember';

/**
 * Adapter to support the Lookup API 3.0 integration
 *
 * @typedef {Object} LookupAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/lookups',

  /**
   * Gets the countries information
   *
   * @param {string} keyword optional keyword
   * @returns {Promise}
   */
  readCountries: function(keyword) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/countries`;
    const options = {
      type: 'GET',
      //contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        keyword: keyword
      }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }


});

