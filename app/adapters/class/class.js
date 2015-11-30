import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: '/gooruapi/rest/v3/class',

  urlForQueryRecord: function(query) {
    const type = query.isStudent ? '/study' : '/teach';

    delete query.isStudent;

    return this.get('namespace') + type;
  }

});
