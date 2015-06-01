module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'lib/**/*.js',
      'test/**/*.js'
    ],
    browsers: process.env.TRAVIS ? ['ChromeTravisCI'] : ['Chrome'],
    customLaunchers: {
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  });
};
