import DS from 'ember-data';
import Env from '../config/environment';
import SessionMixin from '../mixins/session';

const Config = Env['simple-auth-custom'] || {};

export default DS.RESTAdapter.extend(SessionMixin, {

  /**
   * @property {string} API Key
   * @see simple-auth-custom at environment.js
   */
  apiKey: Config.apiKey,

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
    return this._super(modelName, id, snapshot, requestType, query) + sessionTokenParam;
  },

  /**
   * This custom implementation removes the default pluralization of the type
   */
  pathForType: function() {
    return '';
  },

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
