var gulp = require('gulp');
var react = require('gulp-react');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

gulp.task('react', function() {
  return gulp.src('src/js/jsx/sudoku-hints.js')
      .pipe(react())
      .pipe(gulp.dest('app'));
});

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
})

gulp.task('default', function(callback) {
  runSequence(['react', 'browserSync', 'watch'],
    callback
  )
})
