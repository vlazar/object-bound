var shared = require('./karma-shared.conf.js')

module.exports = function (config) {
  shared(config)

  config.set({
    files: [
      'function.js',
      'test/function.js'
    ],
    coverageReporter: {
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly', file: 'function.lcov.info' }
      ]
    }
  })
}
