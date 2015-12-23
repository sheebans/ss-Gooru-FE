import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: '/insights/api/v1',

  /**
   * Builds the end-point URL for the queryRecord queryParam
   * @param query
   * @returns {string}
   */
  urlForQueryRecord: function(query) {
    var namespace = this.get('namespace');
    var classId = query.classId;
    var courseId = query.courseId;
    var unitId = query.unitId;

    delete query.classId;
    delete query.courseId;
    delete query.unitId;

    return `${namespace}/class/${classId}/course/${courseId}/unit/${unitId}/progress`;
  }

});
