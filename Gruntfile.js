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
      "ember-server-nginx": 'ember server --proxy http://localhost:80',

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

  grunt.registerTask('bamboo-test', function (target) {
    /*
      An issue generating the report was found when upgrading ember cli to 1.13.13
      We should give it a try when a new version become available
      grunt.task.run(['stubby:test', 'exec:run:ember test --silent --reporter xunit']);
     */
    grunt.task.run(['stubby:test', 'exec:run:ember test']);
  });

  grunt.registerTask('run', function (target) {
    target = target || 'nginx';
    var serverExecTask = 'exec:ember-server-' + (target);

    var tasks = ['stubby:test'];
    if (target === 'nginx'){
      tasks.push('exec:nginx-stop-server');
      tasks.push('exec:nginx-start-server');
    }
    tasks.push(serverExecTask);
    grunt.task.run(tasks);
  });

  grunt.registerTask('notify', function (target) {
    //touches any file to notify the watcher rebuild the application
    grunt.task.run(['exec:run:touch -m app/app.js']);
  });

};
