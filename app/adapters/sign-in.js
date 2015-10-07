import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: "rest/v2/account/login",

  pathForType() {
    return '';
  },

  buildURL: function(record, suffix) {
    var apiKeyParam = "apiKey="+ this.get("apiKey");
    return this._super(record, suffix) + "?" + apiKeyParam;
  }

});

