import Ember from 'ember';

/**
 * Adapter to support the Learner CRUD operations in the API 3.0
 *
 * @typedef {Object} LearnerAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2',

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
    const url = `${adapter.get('namespace')}/learner/location`;
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
    const url = `${adapter.get('namespace')}/learner/performance`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: { userId, contentType, offset, limit }
    };
    return Ember.$.ajax(url, options);
  },
  /**
   * Fetches independent learner performance in unit
   *
   * @param {string} courseId
   * @param {string} unitId
   * @returns {Promise}
   */
  fetchPerformanceUnit: function(courseId, unitId) {
    const adapter = this;

    const url = `${adapter.get('namespace')}/course/${courseId}/unit/${unitId}/learner/performance`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },
  /**
   * Fetches independent learner performance in lesson
   *
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {string} collectionType - type of collection to retrieve
   * @returns {Promise}
   */
  fetchPerformanceLesson: function(courseId, unitId, lessonId, collectionType) {
    const adapter = this;

    const queryParams = (collectionType) ?
      `collectionType=${collectionType}` : '';

    const url = `${adapter.get('namespace')}/course/${courseId}/unit/${unitId}/lesson/${lessonId}/learner/performance?${queryParams}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
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
    const url = `${adapter.get('namespace')}/courses/learner/performance`;
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
  },

  /**
   * Fetches independent learner location in course
   *
   * @param {string} courseId
   * @param {string} userId
   * @returns {Promise}
   */
  fetchLocationCourse: function(courseId, userId) {
    const adapter = this;

    const url = `${adapter.get('namespace')}/course/${courseId}/user/${userId}/learner/current/location`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  }
});
