'use strict';

var _ = require('lodash');

var task = require('@alexistessier/gulp-workflow-common-task');

task.babel('es6-for-node');

var sort = require('./sort-method');
var sortMethods = [];

_.forEach(sort, function (method, name) {
	sortMethods.push('+ '+name+'\n\n\t```javascript\n\t'+method.toString()+'\n\t```');
});

task.mustache('readme-for-node-package', {
	view: {
		sortMethods: sortMethods.join('\n')
	}
});

task.build();
task.watch();

task.default('build');