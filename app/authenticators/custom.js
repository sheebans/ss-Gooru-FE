import Ember from 'ember';
import ENV from '../config/environment';
import Base from 'ember-simple-auth/authenticators/base';

/**
 * @class
 * @typedef {Object} CustomAuthenticator
 */
export default Base.extend({

  /**
   * @property {string} Token end point
   * @see simple-auth-custom at environment.js
   */
  serverTokenEndpoint: null,

  /**
   * @property {string} api key
   * @see simple-auth-custom at environment.js
   */
  apiKey: null,

  /**
   * Initializing the authorizer
   */
  init: function() {
    const config        = ENV['simple-auth-custom'] || {};
    this.serverTokenEndpoint = config['serverTokenEndpoint'];
    this.apiKey = config['apiKey'];
  },

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
        url: this.serverTokenEndpoint + '?apiKey=' + this.apiKey,
        type: 'POST',
        data: JSON.stringify({
          username: options.username,
          password: options.password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then(function(response) {
        Ember.run(function() {
          resolve({
            token: response.token
          });
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
