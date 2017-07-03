import Ember from 'ember';

/**
 * Adapter to support the Learner CRUD operations in the API 3.0
 *
 * @typedef {Object} LearnerAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2/learner',

  coursesNamespace: '/api/nucleus-insights/v2/courses/learner',

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

  /**
   * Fetches independent learner performance
   *
   * @param {number} userId
   * @param {number} contentType - type of content to retrieve
   * @param {number} offset - for paginated listing of performance
   * @param {number} limit - number of performance to fetch
   * @returns {Promise}
   */
  fetchPerformance: function(userId, contentType, offset=0, limit=20) {
    const adapter = this;
    const url = `${adapter.get('namespace')}/performance`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: { userId, contentType, offset, limit }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches independent learner performance for specific courses
   *
   * @param {number} userId
   * @param {number} courseIds
   * @returns {Promise}
   */
  fetchCoursesPerformance: function(userId, courseIds) {
    const adapter = this;
    const url = `${adapter.get('coursesNamespace')}/performance`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify({ userId, courseIds })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'Authorization': `Token ${this.get('session.token-api3')}`
    };
  }

});
