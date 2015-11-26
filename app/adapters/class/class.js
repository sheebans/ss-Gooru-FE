import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: '/gooruapi/rest/v3/class',

  buildURL: function(modelName, id, snapshot, requestType, query) {
    var sessionTokenParam = '?sessionToken=' + this.get('session.token');
    var url = '';

    if (requestType === 'queryRecord') {
      url = this.get('namespace') + (query.isStudent ? '/study' : '/teach');
    } else {
      url = this._super(modelName, id, snapshot, requestType, query);
    }
    return url + sessionTokenParam;
  }

});



