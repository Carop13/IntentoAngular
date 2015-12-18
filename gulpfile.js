var gulp = require('gulp');
var  connect = require('gulp-connect');
 
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