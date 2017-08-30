'use strict';

const LintIssue = require('./../LintIssue');
const lintId = 'require-engines';
const nodeName = 'engines';
const message = 'engines is required';
const ruleType = 'standard';

const lint = function(packageJsonData, lintType) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
