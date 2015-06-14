var shared = require('./karma-shared.conf.js')

module.exports = function (config) {
  shared(config)

  config.set({
    browsers: ['Firefox'],
    files: [
      'proxy.js',
      'test/proxy.js'
    ],
    coverageReporter: {
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly', file: 'proxy.lcov.info' }
      ]
    }
  })
}
