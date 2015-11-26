import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: '/gooruapi/rest/v2/user/',

  /**
   * Builds the end-point URL using the sessionToken as a query string param
   * @param modelName
   * @param id
   * @param snapshot
   * @param requestType
   * @param query
   * @returns {string}
   */
  buildURL: function(modelName, id, snapshot, requestType, query) {
    var sessionTokenParam = '?sessionToken=' + this.get('session.token');
    var url = '';

    if (requestType === 'queryRecord') {
      url = this.get('namespace') + (query.isUsername ? 'username' : 'emailId') + '/availability';
      if (query.isUsername != undefined) {
        delete query.isUsername;
      }
    } else {
      url = this._super(modelName, id, snapshot, requestType, query);
    }
    return url + sessionTokenParam;
  }

});
