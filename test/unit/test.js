'use strict';
var grunt = require('grunt');

exports.bowerRJS = {
	generateMaps: function (test) {
		test.expect(1);


	    var actual = grunt.file.expand(
	      {
	        cwd: 'tmp/fakeApp'
	      }, '**/*'
	    ).sort();
	    
	    var expected = grunt.file.expand(
	      {
	        cwd: 'test/fixtures/fakeApp'
	      }, '**/*'
	    ).sort();

	    test.deepEqual(expected, actual, 'should create mapped structure');

	    test.done();
	}
};
