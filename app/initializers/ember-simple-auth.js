import Ember from 'ember';
import ENV from '../config/environment';
import Configuration from 'ember-simple-auth/configuration';
import setupSession from 'ember-simple-auth/initializers/setup-session';
import setupSessionService from 'ember-simple-auth/initializers/setup-session-service';

/**
 * Custom ember auth initializer
 * @module
 * @typedef {Object} EmberSimpleAuthInitializer
 */
export default {
  name:       'ember-simple-auth',
  initialize: function(registry) {
    const config        = ENV['ember-simple-auth'] || {};
    config.base         = config.base || {};
    config.base.baseURL = ENV.baseURL;
    Configuration.load(config);

    setupSession(registry);
    setupSessionService(registry);

    Ember.Logger.info('Init...');
  }
};
