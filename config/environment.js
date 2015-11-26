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
    baseURL: '/'
  };

  ENV['player'] = {
    pdfViewerUrl: 'http://qa.gooru.org/doc/a/view'
  };

  ENV['simple-auth-custom'] = {
    apiKey: 'ASERTYUIOMNHBGFDXSDWERT123RTGHYT',
    serverTokenEndpoint: '/gooruapi/rest/v2/account/login',
    anonymousEndpoint: '/gooruapi/rest/v2/account/loginas/anonymous'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self'",
      'font-src': "'self' https://fonts.gstatic.com",
      'connect-src': "'self' http://localhost:8882 http://qa.gooru.org",
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

    ENV['ember-simple-auth'].store = 'session-store:ephemeral';

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
