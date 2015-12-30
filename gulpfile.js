var gulp = require('gulp');
var server = require('gulp-express');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
 
gulp.task('reload', function () {
  gulp.src('./app/**/*.*')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['reload']);
  gulp.watch(['./app/**/*.js'], ['reload']);
  gulp.watch(['./app/styles/*.css'], ['reload']);
});
 
gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
});

gulp.task('inject', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['!./app/lib/**/*', './app/**/*.js', './app/styles/**/*.css'], {read: false});
 
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('app'));
});

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['server/app.js']);
 
});

gulp.task('default', ['connect', 'wiredep', 'inject', 'server',  'watch']);

