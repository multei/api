/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  coverageAnalysis: "off",
  files: ['__mocks__/**/*.js', 'package.json', 'src/**/*.js', '!src/**/*.e2e.test.js'],
  mutate: [
    'src/**/*.js',
    '!src/**/*.e2e.test.js',
    '!src/**/*.unit.test.js',
    '!__mocks__/**/*.js'
  ],
  mutator: "javascript",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  transpilers: []
};
