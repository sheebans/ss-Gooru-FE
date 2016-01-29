module.exports = function (grunt) {

  grunt.initConfig({
    exec: {
      "run": {
        cmd: function (command) {
          return command;
        }
      },
      "ember-server-stubby": 'ember server --proxy http://localhost:8882',
      "ember-server-qa": 'ember server --proxy http://qa.gooru.org',
      "ember-server-nginx": 'ember server --proxy http://localhost:8080',

      "nginx-start-server": 'sudo nginx -p ./ -c ./nginx.conf',
      'nginx-start-test-server': 'sudo nginx -p ./ -c ./nginx-test.conf',
      'nginx-stop-server': 'sudo nginx -s stop'
    },

    stubby: {
      test: {
        options: {
          relativeFilesPath: true,
          persistent: false,
          mute: true,
          location: "0.0.0.0"
        },
        files: [{
          src: ['tests/stubs/**/*-endpoint.json']
        }]
      },
      server: {
        options: {
          relativeFilesPath: true,
          persistent: true,
          mute: false,
          location: "0.0.0.0"
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
    if (target === "cli") { //for bamboo
      grunt.task.run(['stubby:test', 'exec:nginx-stop-server', 'exec:nginx-start-test-server', 'exec:run:ember test --silent --reporter xunit']);
      return;
    }

    //for development
    var noStubby = grunt.option("no-stubby") || grunt.option("ns"),
      server = grunt.option("server") || grunt.option("s");

    var command = 'ember test';
    if (server) {
      command += " --server";
    }
    var testExecTask = 'exec:run:' + command;

    var tasks = noStubby ? ['exec:nginx-stop-server', 'exec:nginx-start-test-server', testExecTask] : ['stubby:test', 'exec:nginx-stop-server', 'exec:nginx-start-test-server', testExecTask];
    grunt.task.run(tasks);
  });

  grunt.registerTask('run', function (target) {
    target = target || 'nginx';
    var noStubby = grunt.option("no-stubby") || grunt.option("ns"),
      serverExecTask = 'exec:ember-server-' + (target),
      tasks = (noStubby) ? ['exec:nginx-stop-server', 'exec:nginx-start-server', serverExecTask] : ['stubby:test', 'exec:nginx-stop-server', 'exec:nginx-start-server', serverExecTask];

    grunt.task.run(tasks);
  });

  grunt.registerTask('notify', function (target) {
    //touches any file to notify the watcher rebuild the application
    grunt.task.run(['exec:run:touch -m app/app.js']);
  });

};
