/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['themes/edify'] //excluding test theme files
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // NOTE: jquery UI must go before bootstrap; otherwise, tooltips will stop
  // working and other strange things may happen

  // NOTE-2: Only import jqueryUI components we are using, currently the
  // datepicker component causes conflicts with the bootstrap datepicker.

  app.import({
    development: 'bower_components/toastr/toastr.js',
    production:  'bower_components/toastr/toastr.min.js'
  });

  app.import({
    development: 'bower_components/toastr/toastr.css',
    production:  'bower_components/toastr/toastr.min.css'
  });

  app.import({
    development: 'bower_components/jquery-ui/ui/core.js',
    production:  'bower_components/jquery-ui/ui/minified/core.min.js'
  });

  app.import({
    development: 'bower_components/jquery-ui/ui/widget.js',
    production:  'bower_components/jquery-ui/ui/minified/widget.min.js'
  });

  app.import({
    development: 'bower_components/jquery-ui/ui/mouse.js',
    production:  'bower_components/jquery-ui/ui/minified/mouse.min.js'
  });

  app.import({
    development: 'bower_components/jquery-ui/ui/sortable.js',
    production:  'bower_components/jquery-ui/ui/minified/sortable.min.js'
  });

  app.import({
    development: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    production:  'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  });

  // Add touch events to jquery UI: https://github.com/furf/jquery-ui-touch-punch
  app.import({
    development: 'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.js',
    production:  'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'
  });

  app.import({
    development: 'bower_components/switchery/dist/switchery.css',
    production:  'bower_components/switchery/dist/switchery.min.css'
  });
  app.import({
    development: 'bower_components/switchery/dist/switchery.js',
    production:  'bower_components/switchery/dist/switchery.min.js'
  });
  return app.toTree();
};
