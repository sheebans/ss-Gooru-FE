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
    const data = (keyword) ? { keyword: keyword } : {};

    const options = {
      type: 'GET',
      //using default content type so this is serialized as query params
      headers: adapter.defineHeaders(),
      data: data
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the states information
   *
   * @param {string} country id required
   * @param {string} keyword optional keyword
   * @returns {Promise}
   */
  readStates: function(countryId, keyword) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/countries/${countryId}/states`;
    const data = (keyword) ? { keyword: keyword } : {};

    const options = {
      type: 'GET',
      //using default content type so this is serialized as query params
      headers: adapter.defineHeaders(),
      data: data
    };
    return Ember.$.ajax(url, options);
  },


  /**
   *
   * @returns {{Authorization: string}}
   */
  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});

