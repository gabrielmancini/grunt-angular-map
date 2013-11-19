var jsonpretty = require('jsonpretty');

module.exports = function (grunt) {

  var _ = grunt.util._;

  grunt.registerMultiTask('angular_map', 'Generate angular map of src', function() {
    var fileName = this.options().fileName;
    var cwd = this.options().cwd;
    var src = this.options().files.src;
    var nsPrefix = (this.options().nsPrefix) ? this.options().nsPrefix + '.' : '';

    var dirs = grunt.file.expand(
      {
        filter: 'isDirectory',
        cwd: cwd
      }, '**/*'
    );

    src.push('!'+fileName);
    var map = [];
    _.each(dirs, function(dir, key, array) {

      var nameSpace = nsPrefix + dir.split('/').join('.');

      var absPath = cwd + '/' + dir;
      var filesNs = _.pluck(grunt.file.expandMapping(
        src,
        src,
        {
          filter: 'isFile',
          cwd: absPath,
          rename: function(destBase, destPath) {
            return nameSpace  + '.' + destPath.replace(/\.js$/, '');
          }
        }
      ), 'dest')

      var subDirs = grunt.file.expand(
          {
            filter: 'isDirectory',
            cwd: absPath
          },
          '*'
        )
      var subDirsNs = _.map(subDirs, function (_dir) {
          return nameSpace  + '.' + _dir;
        });

      var objs = _.union(filesNs, subDirsNs);

      if (objs) {
        map.push({
          ns: nameSpace,
          path: absPath,
          objs: objs,
        });
      }

    })

    _.each(map, function (element, key, array) {
      var localFile = element.path +'/'+ fileName;

      var head = '/* Automatic generetad by angular_map on:' + localFile + ' */'
      var template = '<%= head %>\nangular.module(\'<%= ns %>\', <%= objs %>);';

      var data = {
        ns: element.ns,
        objs: jsonpretty(element.objs),
        head: head
      };

      var contents = grunt.template.process(template, { data: data });

      grunt.file.write(localFile, contents);

      grunt.log.ok('Success generate file:' + localFile);
    });

  });
};
