import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  //namespace: '/api/nucleus-insights/v2',
  namespace: '/mocked-api/insights/api/v2',

  /**
   * Builds the end-point URL for the queryRecord queryParam
   * Given a Content ID, User ID and Collection Type, returns performance data of each resource/question in Content
   * @param query
   * @returns {string}
   */
  urlForQueryRecord: function(query) {
    const namespace = this.get('namespace');
    const contentId = query.contentId;
    const collectionType = query.collectionType;
    const unitId = query.unitId;
    const lessonId = query.lessonId;
    const userId = query.userId;
    const classId = query.classId;

    delete query.classId;
    delete query.courseId;
    delete query.unitId;
    delete query.lessonId;
    delete query.contentId;
    delete query.collectionType;
    delete query.userId;

    if(collectionType == "assessment") {
      return `${namespace}/assessment/${contentId}/user/${userId}`;
    }else {
      return `${namespace}/collection/${contentId}/user/${userId}?classGooruId=eca17cf9-54fe-4c78-b7f0-85d5641a9a69&courseGooruId=fcdbf316-56b3-4cc1-a8ac-4522ffc7e001&unitGooruId=dce40150-61b9-4b02-8b44-4cc0a51b1974&lessonGooruId=f2013b8b-cd99-4361-a5ed-6c292ac05705`;
    }
  }

});
