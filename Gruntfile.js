'use strict';
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-bower-just-install');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadTasks('tasks');

  grunt.registerTask('mkdir', function (dir) {
    require('fs').mkdirSync(dir);
  });

  grunt.registerTask('mkdir', function (dir) {
    require('fs').mkdirSync(dir);
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      test: [
        'tmp',
      ]
    },

    copy: {
      test: {
        files: [
          {expand: true, cwd: 'test/', src: ['fakeApp/**'], dest: 'tmp/'},
        ]        
      }
    },


    angular_map: {
      source: {
        options: {
          fileName: 'index.js',
          nsPrefix: 'app',
          cwd: 'tmp/fakeApp/scripts',
          files: {
            src: [
              '*.js',
              '!app*.js',
              '!*.tpl.html',
              '!main.js',
              '!*.spec.js'
            ]
          }
        }
      }
    },


    nodeunit: {
      tasks: ['test/unit/test.js']
    }

  });

  

  grunt.registerTask('test', [
    'clean',
    'mkdir:tmp',
    'copy',
    'angular_map',
    'nodeunit',
    'clean'
  ]);

  grunt.registerTask('default', ['test']);
};
