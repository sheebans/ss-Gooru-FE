/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'gooru-web',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };


  ENV.i18n = {
    defaultLocale: 'en'
  };

  ENV['ember-simple-auth'] = {
    base: {
      store: 'session-store:local-storage',
      authorizer: 'authorizer:custom',
      session: 'session:withCurrentUser',
      routeAfterAuthentication: '/index'
    }
  };

  ENV['simple-auth-custom'] = {
    serverTokenEndpoint: '/rest/v2/account/login',
    apiKey: 'ASERTYUIOMNHBGFDXSDWERT123RTGHYT'
  };


  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self'",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:8882",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'"
    }

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV['ember-simple-auth'].store = 'simple-auth-session-store:ephemeral';

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
