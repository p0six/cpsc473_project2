/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'imgrepo',
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
    firebase: {
     apiKey: 'AIzaSyBzl9X8n19ZA-zOvmcj4v4lh5vnGxNV3bo',
     authDomain: 'imghost-17e95.firebaseapp.com',
     databaseURL: 'https://imghost-17e95.firebaseio.com',
     storageBucket: 'imghost-17e95.appspot.com',
     projectId: 'imghost-17e95',
     messagingSenderId: '650067384567'
    //apiKey: "AIzaSyDUX1blt7cqokMcp9TRoVBnk-gfSRunlTs",
    //authDomain: "test-9aa99.firebaseapp.com",
    //databaseURL: "https://test-9aa99.firebaseio.com",
    //projectId: "test-9aa99",
    //storageBucket: "test-9aa99.appspot.com",
    //messagingSenderId: "66285183660"
    },
    torii: {
      sessionServiceName: 'session'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
