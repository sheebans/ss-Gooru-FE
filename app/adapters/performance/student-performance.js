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
    var url = '';

    if (query.unitId) {
      url = this.urlForLesson(this.get('namespace'), query.classId, query.courseId, query.unitId);
      delete query.unitId;
    } else {
      url = this.urlForUnit(this.get('namespace'), query.classId, query.courseId);
    }

    delete query.classId;
    delete query.courseId;

    return url;
  },

  urlForUnit: function(namespace, classId, courseId) {
    return `${namespace}/class/${classId}/course/${courseId}/progress`;
  },

  urlForLesson: function(namespace, classId, courseId, unitId) {
    return `${namespace}/class/${classId}/course/${courseId}/unit/${unitId}/progress`;
  }

});
