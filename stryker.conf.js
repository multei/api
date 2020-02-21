const glob = require('glob')

module.exports = function(config) {
  config.set({
    coverageAnalysis: 'off',
    files: ['__mocks__/**/*.js', 'package.json', 'src/**/*.js', '!src/**/*.api.test.js'],
    jest: {
      config: require('./jest.config')
    },
    mutate: [
      'src/**/*.js',
      '!src/**/*.unit.test.js',
      '!src/**/*.api.test.js',
      '!__mocks__/**/*.js'
    ],
    mutator: "javascript",
    packageManager: "npm",
    reporters: [
      "clear-text",
      "dashboard",
      "html",
      "progress",
    ],
    // testRunner: "jest",
    transpilers: [],
  });
};
