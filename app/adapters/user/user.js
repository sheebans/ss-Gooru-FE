import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: 'gooruapi/rest/v2/user',

  urlForQueryRecord: function(query, modelName) {
    if (query.isMembersByClass) {
      const classId = query.classId;

      delete query.isMembersByClass;
      delete query.classId;

      return '/gooruapi/rest/v3/class/%@/member'.fmt(classId);
    } else {
      return this._super(query, modelName);
    }
  }

});
