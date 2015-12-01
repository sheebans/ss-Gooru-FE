import ApplicationAdapter from '../application';

/**
 * Lesson model adapter
 *
 * @typedef {Object} LessonAdapter
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
      courseId = query.courseId,
      unitId= query.unitId;

    delete query.classId;
    delete query.courseId;
    delete query.unitId;

    return '%@/%@/course/%@/unit/%@/lesson'.fmt(namespace, classId, courseId, unitId);
  }

});
