var gulp = require('gulp');
var  connect = require('gulp-connect');
var inject = require('gulp-inject');
 
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
 
gulp.task('default', ['connect', 'watch']);

gulp.task('index', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./app/**/*.js', './app/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
});