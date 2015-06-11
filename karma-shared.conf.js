module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: process.env.TRAVIS ? ['ChromeTravisCI'] : ['Chrome'],
    customLaunchers: {
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['progress', 'coverage'],
    preprocessors: {
      '*.js': ['coverage']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  })
}
