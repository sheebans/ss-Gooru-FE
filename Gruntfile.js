module.exports = function (grunt) {

  grunt.initConfig({
    exec: {
      "run": {
        cmd: function(command){
          return command;
        }
      },
      "ember-server-stubby": 'ember server --proxy http://localhost:8882',
      "ember-server-qa": 'ember server --proxy http://qa.gooru.org'
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
    if (target === "cli"){ //for bamboo
      grunt.task.run(['stubby:test', 'exec:run:ember test --silent --reporter xunit']);
      return;
    }

    //for development
    var noStubby = grunt.option("no-stubby"),
      server = grunt.option("server") || grunt.option("s"),
      filter = grunt.option("filter") || grunt.option("f"),
      module = grunt.option("module") || grunt.option("m");

      var command = 'ember test';
      if (server){
        command += " --server";
      }
      if (filter){
        command += (" --filter=\"" + filter + "\"");
      }
      if (module){
        command += (" --module=\"" + module + "\"");
      }

    var testExecTask = 'exec:run:' + command;

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
