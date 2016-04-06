import Ember from 'ember';
import ApplicationAdapter from '../application';

/**
 * Adapter to support the Class CRUD operations
 *
 * @typedef {ApplicationAdapter} ClassAdapter
 */
export default ApplicationAdapter.extend({

  session: Ember.inject.service('session'),

  /**
   * @property {string} End-point URI for old API
   */
  namespace: '/gooruapi/rest/v3/class',

  /**
   * @property {string} End-point URI for API 3.0
   */
  api3Namespace: '/api/nucleus/v1/classes',

  /**
   * Builds the end-point URL for the queryRecord queryParam
   * @param query
   * @returns {string}
   */
  urlForQueryRecord: function(query) {
    let namespace = this.get('namespace');
    let type = query.isStudent ? 'study' : 'teach';

    delete query.isStudent;

    return `${namespace}/${type}`;
  },

  /**
   * Gets the list of classes for a user
   * @returns {Promise}
   */
  getMyClasses: function() {
    const adapter = this;
    const url = adapter.get('api3Namespace');
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Creates the headers required by API 3.0
   * @returns {{Authorization: string}}
   */
  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
