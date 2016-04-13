import Ember from 'ember';

/**
 * Adapter to support the Course CRUD operations in the API 3.0
 *
 * @typedef {Object} CourseAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/courses',

  /**
   * Posts a new course
   *
   * @param data - course data to be sent in the request body
   * @returns {Promise|String} ID of the newly created course
   */
  createCourse: function(data) {
    const url = this.get('namespace');
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify(data.body)
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData, textStatus, request) {
          var courseId = request.getResponseHeader('location');
          resolve(courseId);
        }, function (error) {
          reject(error);
        });
    });
  },

  /**
   * Update existing course
   *
   * @param data - course data to be sent in the request body
   * @returns {Promise|String} ID of the newly created course
   */
  updateCourse: function (data) {
    const courseId = data.courseId;
    const url = this.get('namespace') + `/${courseId}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify(data.course)
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function () {
          resolve('');
        }, function (error) {
          reject(error);
        });
    });
  },

  /**
   * Get course data for the corresponding course ID
   *
   * @param courseId - course ID to search for
   * @returns {Promise|Object}
   */
  getCourseById: function (courseId) {
    const url = this.get('namespace') + `/${courseId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders()
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData) {
          resolve(responseData);
        }, function (error) {
          reject(error);
        });
    });
  },

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});