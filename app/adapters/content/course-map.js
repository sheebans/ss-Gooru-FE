import Ember from 'ember';
import ApplicationAdapter from 'gooru-web/adapters/application';

/**
 * Adapter to support the course map operations
 *
 * @typedef {Object} CourseMapAdapter
 */
export default ApplicationAdapter.extend({

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
      headers: adapter.get('headers')
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Creates a New Path based on the Context data.
   * @param {Object} context - is the base context data used to define a new path. It is an object with these properties
   * { courseId, classId, unitId, lessonId, collectionId }
   * @param {Object} target - the target context. It is an object with these properties
   * { courseId, unitId, lessonId, collectionId }
   * @param {Integer} pathId - an optional parameter with a Path Id.
   * @returns {Ember.RSVP.Promise}
   */
  createNewPath: function (context, target, pathId = undefined) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/paths`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.get('headers'),
      data: JSON.stringify({
        'ctx_course_id': context.get('courseId'),
        'ctx_class_id': context.get('classId'),
        'ctx_unit_id': context.get('unitId'),
        'ctx_lesson_id': context.get('lessonId'),
        'ctx_collection_id': context.get('collectionId'),
        'path_id': pathId,
        'target_content_type': target.get('contentType'),
        'target_content_subtype': target.get('contentSubType'),
        'target_course_id': target.get('courseId'),
        'target_unit_id': target.get('unitId'),
        'target_lesson_id': target.get('lessonId'),
        'target_collection_id': target.get('collectionId')
      })
    };
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData, textStatus, request) {
          resolve(request.getResponseHeader('location'));
        }, reject);
    });
  }

});
