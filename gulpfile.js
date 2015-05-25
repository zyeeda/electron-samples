var gulp      = require('gulp');
var flow      = require('gulp-flowtype');
var babel     = require('gulp-babel');
var watch     = require('gulp-watch');
var sass      = require('gulp-sass');
var karma     = require('gulp-karma');
var childExec = require('child_process').exec;
var webpack   = require('gulp-webpack');

// js 程序文件路径
var jsPaths = [
    './app/src/**/*.js',
    './app/src/*.js'
];

// jsx 程序文件路径
var jsxPaths = [
    './app/src/**/*.jsx',
    './app/src/*.jsx'
];

// assets 程序文件路径
var assetsPaths = [
  './app/src/*.scss',
  './app/src/**/*.scss',
  './app/src/*.css',
  './app/src/**/*.css',
  './app/src/*.jpg',
  './app/src/**/*.jpg',
  './app/src/*.png',
  './app/src/**/*.png',
  './app/src/*.jpeg',
  './app/src/**/*.jpeg',
  './app/src/*.gif',
  './app/src/**/*.gif'
];
var indexPath = ['./app/index.js'];

// 测试文件路径
var testPaths = [
    './app/__tests__/**/*.js',
    './app/__tests__/**/*.jsx',
    './app/__tests__/*.js',
    './app/__tests__/*.jsx'
];

// 所有文件路径
var allPaths = jsPaths.concat(jsxPaths).concat(indexPath).concat(testPaths);

// 编译 js 程序文件
gulp.task('build-src-js', function() {
  return gulp.src(jsPaths)
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: true,
        abort: false
    }))
    .pipe(babel())
    .pipe(gulp.dest('./build/src'));
});

// 编译 jsx 程序文件
gulp.task('build-src-jsx', function() {
  return gulp.src(jsxPaths)
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: true,
        abort: false
    }))
    .pipe(babel())
    .pipe(gulp.dest('./build/src'));
});

// 编译 jsx 程序文件
gulp.task('copy-src-assets', function() {
  return gulp.src(assetsPaths)
    .pipe(gulp.dest('./build/src'));
});
// 编译 src
gulp.task('build-src', ['build-src-js', 'build-src-jsx', 'copy-src-assets']);

// index.js 与 src 下的文件一起编译，index.js 会被放到 src下，所以此处需要独立编译
gulp.task('build-index', function() {
  return gulp.src(indexPath)
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: true,
        abort: false
    }))
    .pipe(babel())
    .pipe(gulp.dest('./build'));
});

// 编译测试文件
gulp.task('build-test', function() {
  return gulp.src(testPaths)
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: true,
        abort: false
    }))
    .pipe(babel())
    .pipe(gulp.dest('./build/__tests__'));
});

// 复制 app 相关配置文件
gulp.task('copy-config', function() {
  return gulp.src(['./app/index.html', './app/main.js', './app/package.json'])
    .pipe(gulp.dest('./build'));
});

// 编译所有文件
gulp.task('build', ['copy-config', 'build-index', 'build-src', 'build-test']);


// 复制 electron 配置文件
gulp.task('copy-electron', function() {
  return gulp.src(['./build/index.html', './build/main.js', './build/package.json'])
    .pipe(gulp.dest('./dist'));
});

// 打包
gulp.task('package', ['copy-electron', 'build'], function() {
  return gulp.src('./build/index.js')
    .pipe(webpack({
        output: {
            filename: 'bundle.js',
        },
        module: {
            loaders: [
              {test: /\.css$/, loader: 'style-loader!css-loader'},
              {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
              {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192'},
              { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
              { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
            ]
          }
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task( 'watch-src', [], function(){
    gulp.watch(jsPaths, [ 'build-src-js', 'package'] );
    gulp.watch(jsxPaths, [ 'build-src-jsx', 'package'] );
});

gulp.task( 'watch-src-assets', [], function(){
    gulp.watch(assetsPaths, [ 'copy-src-assets', 'package'] );
});

gulp.task( 'watch-index', [], function(){
    gulp.watch(indexPath, [ 'build-index', 'package'] );
});

gulp.task( 'watch-test', [], function(){
    gulp.watch(testPaths, [ 'build-test', 'package'] );
});

gulp.task( 'watch', ['build', 'package', 'watch-src','watch-src-assets', 'watch-index', 'watch-test']);

// 运行测试 --无法输出日志信息
// gulp.task('test', function (cb) {
//   // var cmd = 'node_modules/karma/bin/karma start ' + __dirname + '/karma.conf.js';
//   var cmd = ' npm test';
//   var child = childExec(cmd, function (err, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   });
//   child.stdout.on('info', function (info) {
//     console.log(info);
//   });
//   child.stderr.on('info', function (info) {
//     console.log(info);
//   });
// });

// 使用 gulp-karma 组件进行测试，无法输入日志（可能是 gulp-karma 组件存在问题）
gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(['./build/**/*.js'])
    .pipe(karma({
      configFile: __dirname + '/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      throw err;
    });
});

// 运行 electron
gulp.task('run', function (cb) {
  var cmd = 'electron ' + __dirname + '/dist';
  var child = childExec(cmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  // 输出标准输出和标准错误到控制台
  child.stdout.on('info', function (info) {
    console.log(info);
  });
  child.stderr.on('info', function (info) {
    console.log(info);
  });
});
