var shared = require('./karma-shared.conf.js')

module.exports = function (config) {
  shared(config)

  config.set({
    files: [
      'property.js',
      'test/property.js'
    ],
    coverageReporter: {
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly', file: 'property.lcov.info' }
      ]
    }
  })
}
