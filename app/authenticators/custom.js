import Ember from "ember";
import BaseAuthenticator from "ember-simple-auth/authenticators/base";
import Env from "../config/environment";

const Config = Env["simple-auth-custom"] || {};

/**
 * @class
 * @typedef {Object} CustomAuthenticator
 */
export default BaseAuthenticator.extend({

  /**
   * @property {string} Server token end-point
   * @see simple-auth-custom at environment.js
   */
  serverTokenEndpoint: Config.serverTokenEndpoint,

  /**
   * @property {string} API Key
   * @see simple-auth-custom at environment.js
   */
  apiKey: Config.apiKey,

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: this.serverTokenEndpoint + "?apiKey=" + this.apiKey,
        type: "POST",
        data: JSON.stringify({
          username: options.username,
          password: options.password
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json"
      }).then(function(response) {
        response.isDefaultUser = options.isDefaultUser;
        Ember.run(function() {
          resolve(response);
        });
      }, function(xhr) {
        var response = xhr.responseText;
        Ember.run(function() {
          reject(response);
        });
      });
    });
  },

  invalidate: function() {
    return Ember.RSVP.resolve();
  }

});
