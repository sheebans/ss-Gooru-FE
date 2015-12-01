import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: '/gooruapi/rest/v3/class',

  urlForQueryRecord: function(query) {
    let namespace =this.get('namespace');
    const type = query.isStudent ? 'study' : 'teach';

    delete query.isStudent;

    return `${namespace}/${type}`;
  }

});
