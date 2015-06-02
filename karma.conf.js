module.exports = function configKarma(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine-jquery', 'jasmine'],

    files: [
      'build/__tests__/**/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      // 'build/__tests__/**/*.js': ['browserify']
      'build/__tests__/**/*.js': ['webpack']
    },

    // browserify: {
    //   transform: ['istanbulify'],
    //   extensions: ['.js'],
    //   debug: true,
    //   bundleDelay: 1000,  // WAR for karma-browserify race condition
    // },

    webpack: {
      module: {
          loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
            {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192'},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'}
          ]
        }
    },

    // reporters: ['progress', 'coverage'],
    // reporters: ['progress'],
    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    // browsers: ['Chrome', 'Electron'],

    browsers: ['Chrome'],

    singleRun: false,

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    plugins: [
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-electron-launcher'),
      require('karma-jasmine'),
      require('karma-jasmine-jquery'),
      require('karma-requirejs'),
      require('karma-webpack')
    ]
  });
};
