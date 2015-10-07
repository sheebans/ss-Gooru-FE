import Ember from "ember";
import DS from "ember-data";
import SessionMixin from "../mixins/session";
import Env from "../config/environment";

const Config = Env["simple-auth-custom"] || {};

export default DS.RESTAdapter.extend(SessionMixin, {

  /**
   * @property {string} Session token
   */
  sessionToken: Ember.computed("session.authToken", function() {
    return this.get("session.data.authenticated")["token"];
  }),

  /**
   * @property {string} API Key
   * @see simple-auth-custom at environment.js
   */
  apiKey: Config.apiKey,

  /**
   * Customizing ajax calls
   * @param url
   * @param method
   * @param hash
   * @returns {*}
   */
  ajax: function(url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: false};
    return this._super(url, method, hash);
  }

});
