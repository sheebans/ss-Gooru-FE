module.exports = function (grunt) {

  grunt.initConfig({
    exec: {
      "ember-test": 'ember test --silent --reporter xunit',
      "ember-test-dev": 'ember test --server'
    },

    stubby: {
      test: {
        options: {
          relativeFilesPath: true,
          persistent: false,
          mute: true
        },
        files: [{
          src: ['tests/stubs/**/*-endpoint.json']
        }]
      },
      server: {
        options: {
          relativeFilesPath: true,
          persistent: true,
          mute: false
        },
        files: [{
          src: ['tests/stubs/**/*-endpoint.json']
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-stubby');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('test', function (target) {

    var tasks = [
      'stubby:test',
      'exec:ember-test' + ((target === 'dev') ? '-dev' : '')
    ];
    grunt.task.run(tasks);
  });

};
