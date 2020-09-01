'use strict';
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'imgrepo',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    firebase: {
      apiKey: 'AIzaSyBzl9X8n19ZA-zOvmcj4v4lh5vnGxNV3bo',
      projectId: 'imghost-17e95',
      credential: admin.credential.cert(serviceAccount),
      authDomain: 'imghost-17e95.firebaseapp.com',
      databaseURL: 'https://imghost-17e95.firebaseio.com',
      storageBucket: 'imghost-17e95.appspot.com',
      experimentalForceLongPolling: true
    },

    // if using ember-cli-content-security-policy
    // contentSecurityPolicy: {
    //   'script-src': "'self' 'unsafe-eval' apis.google.com",
    //   'frame-src': "'self' https://*.firebaseapp.com",
    //   'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com http://localhost:4200"
    // },
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com http://localhost:4200",
      'frame-src': "'self' http://localhost:4200 https://*.firebaseapp.com",
      'connect-src': "'self' http://localhost:4200 https://*.googleapis.com wss://*.firebaseio.com",
      'child-src': "'self' http://localhost:4200 https://*.googleapis.com wss://*.firebaseio.com",
      'img-src': "'self' http://localhost:4200 https://*.googleapis.com wss://*.firebaseio.com https://www.gstatic.com",
      'style-src': "'self' 'unsafe-inline' ",
    },

    torii: {
      sessionServiceName: 'session'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
