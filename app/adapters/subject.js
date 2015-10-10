import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: "rest/v2/library",

  /**
   * Builds the end-point URL using the sessionToken as a query string param
   * @param record
   * @param suffix
   * @returns {string}
   */
  buildURL: function(record, suffix) {
    var sessionTokenParam = "sessionToken="+ this.get("sessionToken");
    return this._super(record, suffix) + "?" + sessionTokenParam;
  }

});

