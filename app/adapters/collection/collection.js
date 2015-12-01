import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: 'gooruapi/rest/v3/collection',

  urlForFindRecord: function(query){
    let namespace = this.get('namespace');
    let includeItemParam = 'includeItems=true';
    let includeLastModifiedUserParam = 'includeLastModifiedUser=true';

    return `${namespace}?${includeItemParam}&${includeLastModifiedUserParam}`;
  },
  urlForQueryRecord: function(query) {

    let namespace = 'gooruapi/rest/v3/';
    let classId = query.classId;
    let courseId = query.courseId;
    let unitId = query.unitId;
    let lessonId = query.lessonId;

    delete query.classId;
    delete query.courseId;
    delete query.unitId;
    delete query.lessonId;

    return `${namespace}class/${classId}/course/${courseId}/unit/${unitId}/lesson/${lessonId}`;

  }

});
