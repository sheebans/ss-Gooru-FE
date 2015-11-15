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



http://qa.gooru.org/gooruapi/rest/v3/collection/8b571177-3235-4f11-9e7a-b4be3aecd267
// ?includeItems=true&includeLastModifiedUser=true&sessionToken=0ecfafb0-9778-4183-a962-40027e8329c2
