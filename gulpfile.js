const gulp = require('gulp');
// const gutil = require('gulp-util');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const flow = require('gulp-flowtype');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
// const karma = require('gulp-karma');
// const shell = require('gulp-shell');
// const packageJson = require('./package.json');

/*const options = {
  name: 'Spectacular'
};*/

gulp.task('js', function runTask() {
  return gulp.src('app/src/**/*.js')
    .pipe(plumber())
    .pipe(changed('./build/src'))
    .pipe(sourcemaps.init())
    .pipe(flow({
        declarations: './declarations'
    }))
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/src'))
    .pipe(livereload());
});

gulp.task('images', function runTask() {
  return gulp.src('app/assets/images/*', { base: 'app' })
    .pipe(plumber())
    .pipe(changed('./build/assets/images'))
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('styles', function runTask() {
  return gulp.src('app/assets/styles/main.scss', { base: 'app' })
    .pipe(plumber())
    .pipe(changed('./build/assets/styles'))
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'))
    .pipe(concat('main.css'))
    .pipe(livereload());
});

gulp.task('copy', function runTask() {
  gulp.src('index.html')
    .pipe(gulp.dest('./build'))
    .pipe(livereload());

  gulp.src('app/assets/fonts/**', { base: 'app' })
    .pipe(changed('./build/assets/fonts'))
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('default', ['js', 'images', 'styles', 'copy'], function defaultTask() {
  gulp.watch('app/src/**/*.js', ['js']);
  gulp.watch('app/assets/images/*', ['images']);
  gulp.watch('app/assets/styles/main.scss', ['styles']);
  gulp.watch('index.html', ['copy']);

  livereload.listen();
});

// gulp.task('build-src', ['build-src-js', 'build-src-jsx', 'copy-src-assets']);

// 复制 electron 配置文件
/*gulp.task('copy-electron', function() {
  return gulp.src(['./build/index.html', './build/main.js', './build/package.json'])
    .pipe(gulp.dest('./dist'));
});*/

// 打包
/*gulp.task('package', ['copy-electron', 'build'], function() {
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
});*/

/*gulp.task( 'watch-src', [], function(){
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

gulp.task( 'watch', ['build', 'package', 'watch-src','watch-src-assets', 'watch-index', 'watch-test']);*/

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
/*gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(['./build//*.js'])
    .pipe(karma({
      configFile: __dirname + '/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      throw err;
    });
});*/

// 运行 electron
/*gulp.task('run', function (cb) {
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
});*/
