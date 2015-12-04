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

  /**
   * Builds the end-point URL for the queryRecord queryParam
   * @param query
   * @returns {string}
   */
  urlForQueryRecord: function(query) {
    let namespace = this.get('namespace');
    let classId = query.classId;
    let courseId = query.courseId;
    let unitId= query.unitId;

    delete query.classId;
    delete query.courseId;
    delete query.unitId;

    return `${namespace}/${classId}/course/${courseId}/unit/${unitId}/lesson`;
  }

});
