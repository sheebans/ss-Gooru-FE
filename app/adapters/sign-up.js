import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: "rest/v2/user",

  pathForType() {
    return '';
  },

  buildURL: function(record, suffix) {
    var sessionTokenParam = "sessionToken=" + this.get("sessionToken");
    return this._super(record, suffix) + "?" + sessionTokenParam;
  }

});
