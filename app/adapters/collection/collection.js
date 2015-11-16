import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: 'gooruapi/rest/v3/collection',

  buildURL: function(modelName, id, snapshot, requestType, query) {
    var includeItemParam = '&includeItems=true';
    var includeLastModifiedUserParam = '&includeLastModifiedUser=true';
    return this._super(modelName, id, snapshot, requestType, query) + includeItemParam + includeLastModifiedUserParam;
  }

});
