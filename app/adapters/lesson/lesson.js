import ApplicationAdapter from '../application';

/**
 * Lesson model adapter
 *
 * @typedef {Object} UnitAdapter
 */
export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: '/gooruapi/rest/v3/class',

  buildURL: function(modelName, id, snapshot, requestType, query) {
    const adapter = this,
      token = adapter.get('session.token'),
      namespace = adapter.get('namespace'),
      classId = query.classId,
      courseId = query.courseId,
      unitId = query.unitId;
    delete query.classId;
    delete query.courseId;
    delete query.unitId;

    if (requestType === 'queryRecord') {
      return '%@/%@/course/%@/unit/%@/lesson?sessionToken=%@'.fmt(namespace, classId, courseId, unitId, token);
    }
    return false;
  }

});



