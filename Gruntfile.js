module.exports = function(grunt) {

  grunt.initConfig({
    stubby: {
      stubsServer: {
        options: {
          relativeFilesPath: true,
          persistent: true,
          mute: false
        },
        files: [{
          src: [ 'tests/stubs/**/*-endpoint.json' ]
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-stubby');

};
