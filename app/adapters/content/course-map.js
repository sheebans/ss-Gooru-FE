import Ember from 'ember';

/**
 * Adapter to support the course map operations
 *
 * @typedef {Object} CourseMapAdapter
 */
export default Ember.Object.extend({

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @type {String}} base url for course map API endpoints
   */
  namespace: '/api/nucleus/v2/course-map',

  /**
   * Gets the lesson infor for course map
   * @param {string} courseId - course the lesson belongs to
   * @param {string} unitId - unit the lesson belongs to
   * @param {string} lessonId - lesson ID to search for
   * @returns {Promise}
   */
  getLessonInfo: function (courseId, unitId, lessonId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${courseId}/units/${unitId}/lessons/${lessonId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the Authorization header (internal use only)
   * @returns {Object}
   */
  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
