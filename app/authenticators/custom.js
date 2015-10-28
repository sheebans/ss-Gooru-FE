import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import Env from '../config/environment';

const Config = Env['simple-auth-custom'] || {};

/**
 * @class
 * @typedef {Object} CustomAuthenticator
 */
export default BaseAuthenticator.extend({

  restore: function(data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate: function(options) {
    if (options.anonymous) {
      return authenticateAsAnonymous(Config.anonymousEndpoint, Config.apiKey);
    } else {
      return authenticateWithCredentials(Config.serverTokenEndpoint, Config.apiKey, options.username, options.password);
    }
  }

});

function authenticateWithCredentials(endpoint, apiKey, username, password) {
  var url = endpoint + '?apiKey=' + apiKey;
  return new Ember.RSVP.Promise((resolve, reject) => {
    Ember.$.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json;charset=utf-8',
      dataType: 'json'
    }).then(function (response) {
      response.isAnonymous = false;
      Ember.run(function () {
        resolve(response);
      });
    }, function (error) {
      Ember.run(function () {
        var response = error.responseText;
        reject(response);
      });
    });
  });
}

function authenticateAsAnonymous(endpoint, apiKey) {
  var url = endpoint + '?apiKey=' + apiKey;
  return new Ember.RSVP.Promise((resolve, reject) => {
    Ember.$.ajax({
      url: url,
      type: 'POST',
      data: {},
      contentType: 'application/json;charset=utf-8',
      dataType: 'json'
    }).then(function(response) {
      Ember.run(function () {
        response.isAnonymous = true;
        resolve(response);
      });
    }, function (error) {
      Ember.run(function () {
        var response = error.responseText;
        reject(response);
      });
    });
  });
}
