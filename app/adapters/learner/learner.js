import Ember from 'ember';

/**
 * Adapter to support the Learner CRUD operations in the API 3.0
 *
 * @typedef {Object} LearnerAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2/learner',

  /**
   * Fetches independent learner locations
   *
   * @param {number} userId
   * @param {number} contentType - type of content to retrieve
   * @param {number} offset - for paginated listing of locations
   * @param {number} limit - number of locations to fetch
   * @returns {Promise}
   */
  fetchLocations: function(userId, contentType, offset=0, limit=20) {
    const adapter = this;
    const url = `${adapter.get('namespace')}/location`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: { userId, contentType, offset, limit }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'Authorization': `Token ${this.get('session.token-api3')}`
    };
  }

});
