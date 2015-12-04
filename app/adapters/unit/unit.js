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
  /**
   * Builds the end-point URL for the queryRecord queryParam
   * @param query
   * @returns {string}
   */
  urlForQueryRecord: function(query) {
    let namespace = this.get('namespace');
    let classId = query.classId;
    let courseId = query.courseId;

    delete query.classId;
    delete query.courseId;

    return `${namespace}/${classId}/course/${courseId}/unit`;
  }

});
