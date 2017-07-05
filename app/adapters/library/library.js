import Ember from 'ember';

/**
 * Adapter to support the Library CRUD operations in the API 3.0
 *
 * @typedef {Object} LibraryAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v2/libraries',

  /**
   * Fetches libraries
   *
   * @returns {Promise}
   */
  fetchLibraries: function() {
    const adapter = this;
    const url = adapter.get('namespace');
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Returns a library by id
   * @param {string} libraryId - library ID to search for
   * @returns {Promise}
   */
  getLibraryById: function(libraryId) {
    const adapter = this;
    const url = adapter.get('namespace') + `/${libraryId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
