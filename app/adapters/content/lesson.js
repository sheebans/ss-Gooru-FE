import Ember from 'ember';

/**
 * Adapter to support the Lesson CRUD operations in the API 3.0
 *
 * @typedef {Object} LessonAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: '/api/nucleus/v1/courses',

  /**
   * Posts a new lesson
   *
   * @param params - data to send in the request
   * @returns {Ember.Promise|String} ID of the newly created lesson
   */
  createLesson: function (params) {
    const courseId = params.courseId;
    const unitId = params.unitId;
    const namespace = this.get('namespace');
    const url = `${namespace}/${courseId}/units/${unitId}/lessons`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify(params.lesson)
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData, textStatus, request) {
          var lessonId = request.getResponseHeader('location');
          resolve(lessonId);
        }, function (error) {
          reject(error);
        });
    });
  },

  /**
   * Get lesson data for the corresponding lesson ID
   *
   * @param params - data to send in the request
   * @returns {Promise|Object}
   */
  getLessonById: function (params) {
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const namespace = this.get('namespace');
    const url = `${namespace}/${courseId}/units/${unitId}/lessons/${lessonId}`;
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

  defineHeaders: function () {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
