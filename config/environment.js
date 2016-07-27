/* jshint node: true */

module.exports = function (environment) {

  const extend = function(objectA, objectB) {
    var objectC = {};
    for(var key in objectA) {
      objectC[key] = objectB.hasOwnProperty(key) ? objectB[key] : objectA[key];
    }
    return objectC;
  };

  const GooruEndpointDefault = {
    protocol: 'http://',
    secureProtocol: 'https://',
    hostname: 'nucleus-qa.gooru.org',
    port: undefined,          // Uses the default value 80
    securePort: undefined     // Uses the default value 443
  };

  const RealTimeDefault = {
    webServiceProtocol: 'http://',
    webServiceHostname: 'goorurt.qa.gooruweb.edify.cr',
    webServicePort: undefined,  // Uses the default value 80
    webServiceUri: '/nucleus/realtime',

    webSocketProtocol: 'http://',
    webSocketHostname: 'goorurt.qa.gooruweb.edify.cr',
    webSocketPort: undefined,   // Uses the default value 80
    webSocketUri: '/ws/realtime'
  };

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
    },

    marketingSiteUrl: "/welcome",
    supportSiteUrl: "http://support.gooru.org",
    toolkitSiteUrl:"http://about.gooru.org/toolkit",
    termsConditionsUrl:"http://about.gooru.org/terms-and-conditions"
  };


  ENV.i18n = {
    defaultLocale: 'en'
  };

  ENV['ember-simple-auth'] = {
    baseURL: '/'
  };

  /**
   * Application themes configuration
   */
  ENV['themes'] = {
    'default': null, /* when present it is not necessary to pass a query param */
    'edify' : {
      'translations': {
        'locale': 'en-edify', /* this way it fallback to 'en' */
        'url': 'themes/edify/translations.json'
      },
      'styles': {
        'url': 'themes/edify/styles.css'
      }
    }
  };

  ENV['player'] = {
    vimeoPlayerUrl:'//player.vimeo.com/video/',
    youtubePlayerUrl:'https://www.youtube.com/embed/'
  };

  ENV['events'] = {
    apiVersion: '3.0',
    playerEventEndpoint: '/api/log/event',
    eventAPIKey: '33b9ad34-1a0c-43ba-bb9c-4784abe07110'
  };

  ENV['teamsHosts'] = {
    'localhost': 'teams-qa.gooru.org',             // Development
    'qa.gooruweb.edify.cr': 'teams-qa.gooru.org',  // Edify-QA
    'nucleus-qa.gooru.org': 'teams-qa.gooru.org',  // Nucleus-QA
    'parallel.gooru.org': 'teams.gooru.org',       // Parallel
    'www.gooru.org': 'teams.gooru.org'             // Production
  };

  ENV['simple-auth-custom'] = {
    apiKey: 'ASERTYUIOMNHBGFDXSDWERT123RTGHYT',
    serverTokenEndpoint: '/gooruapi/rest/v2/account/login',
    anonymousEndpoint: '/gooruapi/rest/v2/account/loginas/anonymous'
  };

  ENV['API-3.0'] = {
    clientKey : "c2hlZWJhbkBnb29ydWxlYXJuaW5nLm9yZw==",
    clientId: "ba956a97-ae15-11e5-a302-f8a963065976",
    'user-token-api-2.0': '0e22e273-e2aa-4a6e-9e4f-c4d376c5317b',
    'anonymous-token-api-2.0': '00ed3b76-bffa-4372-90b0-00f886ce2584'
  };

  ENV['google-sign-in'] = {
    url: '/api/nucleus-auth-idp/v1/google'
  };

  ENV['environment-map'] = {
    'localhost': 'local',
    'qa.gooruweb.edify.cr': 'edify-qa',
    'nucleus-qa.gooru.org': 'nucleus-qa',
    'parallel.gooru.org': 'parallel',
    'www.gooru.org': 'prod'
  };

  ENV['gooru-endpoints'] = {
    'local': GooruEndpointDefault,
    'edify-qa': GooruEndpointDefault,
    'nucleus-qa': GooruEndpointDefault,
    'parallel': extend(GooruEndpointDefault, {
      hostname: 'parallel.gooru.org'
    }),
    'prod': extend(GooruEndpointDefault, {
      hostname: 'www.gooru.org'
    })
  };

  ENV['real-time'] = {
    'local': RealTimeDefault,
    'edify-qa': RealTimeDefault,
    'nucleus-qa': extend(RealTimeDefault, {
      webSocketHostname: 'rt.nucleus-qa.gooru.org',
      webServiceHostname: 'nucleus-qa.gooru.org'
    }),
    'parallel': extend(RealTimeDefault, {
      webSocketHostname: 'rt.parallel.gooru.org',
      webServiceHostname: 'parallel.gooru.org'
    }),
    'prod': extend(RealTimeDefault, {
      webSocketHostname: 'rt.gooru.org',
      webServiceHostname: 'www.gooru.org'
    })
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
      'connect-src': "'self' http://localhost:4200 ws://localhost:4200 http://localhost:8882 http://qa.gooru.org http://nucleus-qa.gooru.org",
      'img-src': "'self' data: http://qacdn.gooru.org http://profile-images.goorulearning.org.s3.amazonaws.com " +
        "http://dev-content-gooru-org.s3-us-west-1.amazonaws.com http://dev-user-gooru-org.s3-us-west-1.amazonaws.com",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'media-src': "'self'"
    };
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

    ENV['gooru-endpoints']['local'] = extend(GooruEndpointDefault, {
      secureProtocol: 'http://',
      hostname: 'localhost',
      port: 7357,
      securePort: 7357
    });

    ENV['real-time']['local'] = extend(RealTimeDefault, {
      webSocketHostname: 'localhost',
      webSocketPort: 7357,
      webServiceHostname: 'localhost',
      webServicePort: 7357
    });
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-79540131-1',
      tracker: "analytics.js",
      globalVariable: "hewlettOERTracker",
      cookieName: "hewlettOERCookie"
    };
  }

  return ENV;
};
