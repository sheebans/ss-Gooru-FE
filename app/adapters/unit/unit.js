import ApplicationAdapter from '../application';

/**
 * Unit model adapter
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
      courseId = query.courseId;

    delete query.classId;
    delete query.courseId;

    if (requestType === 'queryRecord') {
      return '%@/%@/course/%@/unit?sessionToken=%@'.fmt(namespace, classId, courseId, token);
    }
    return false;
  }

});



