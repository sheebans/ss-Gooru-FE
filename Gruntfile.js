module.exports = function (grunt) {

  grunt.initConfig({
    exec: {
      "ember-test": {
        cmd: function(server, filter){
          var command = 'ember test';
          if (server === "true"){
            command += " --server";
          }
          if (filter){
            command += (" --filter " + filter);
          }
          return command;
        }
      },
      "ember-test-cli": 'ember test --silent --reporter xunit',
      "ember-server-stubby": 'ember server --proxy http://localhost:8882',
      "ember-server-qa": 'ember server --proxy http://qa.gooru.org',
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

  grunt.registerTask('test', function () {
    var noStubby = grunt.option("no-stubby"),
      server = grunt.option("server"),
      filter = grunt.option("filter");

    var testExecTask = 'exec:ember-test:' + ((server) ? "true" : "false");
    if (filter){ //when filtering tests
      testExecTask += ":" + filter;
    }

    var tasks = noStubby ? [testExecTask] : [ 'stubby:test', testExecTask ];
    grunt.task.run(tasks);
  });

  grunt.registerTask('run', function (target) {
    target = target || 'stubby';

    var stubbyTask = target === 'stubby',
        serverExecTask = 'exec:ember-server-' + (target),
        tasks = (stubbyTask) ? ['stubby:test', serverExecTask] : [serverExecTask];

    grunt.task.run(tasks);
  });

};
