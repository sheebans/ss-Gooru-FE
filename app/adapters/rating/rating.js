import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: 'gooruapi/rest/v2',

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
    var url = '';
    var sessionTokenParam = '?sessionToken=' + this.get('session.token');

    if (requestType === 'createRecord') {
      url = this.get('namespace') + '/rating';
    } else if (requestType == 'findRecord') {
      url = this.get('namespace') + '/content/' + id + '/rating/star';
    } else {
      url = this._super(modelName, id, snapshot, requestType, query);
    }
    return url + sessionTokenParam;
  }

});
