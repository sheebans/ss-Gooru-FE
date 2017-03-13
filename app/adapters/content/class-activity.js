import Ember from 'ember';

/**
 * Adapter to support the class activity CRUD operations
 *
 * @typedef {Object} ClassActivityAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v2/classes',


  /**
   * Adds a new content to class
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {string} contentType
   * @param { { courseId: string, unitId: string, lessonId: string } } context
   * @returns {Promise}
   */
  addContentToClass: function (classId, contentId, contentType, context = {}) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        classId: classId,
        content_id: contentId,
        content_type: contentType,
        ctx_course_id: context.courseId,
        ctx_unit_id: context.unitId,
        ctx_lesson_id: context.lessonId,
        ctx_collection_id: context.collectionId
      })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }


});
