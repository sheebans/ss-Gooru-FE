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

  urlForQueryRecord: function(query) {
    const
      adapter = this,
      namespace = adapter.get('namespace'),
      classId = query.classId,
      courseId = query.courseId;

    delete query.classId;
    delete query.courseId;

    return '%@/%@/course/%@/unit'.fmt(namespace, classId, courseId);
  }

});
