var gulp = require('gulp');
var react = require('gulp-react');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
const jasmine = require('gulp-jasmine');

// Build react file
gulp.task('react', function() {
  return gulp.src('src/js/jsx/sudoku-hints.js')
      .pipe(react())
      .pipe(gulp.dest('app'))
      .on('end', browserSync.reload);
});

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app',
      index: 'index.html'
    }
  })
});

// Combine javascripts into 1 file
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app'))
    .on('end', browserSync.reload);
});

// Copy html
gulp.task('moveHtml', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('app'))
    .on('end', browserSync.reload);
});

// Copy css
gulp.task('moveCss', function() {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('app/css'))
    .on('end', browserSync.reload);
});

// Copy vendor js
gulp.task('moveVendor', function() {
  return gulp.src('src/vendor/*.js')
    .pipe(gulp.dest('app'));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/*.html', ['moveHtml']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/js/jsx/*.js', ['react']);
  gulp.watch('src/css/*.css', ['moveCss']);
});

// Test
gulp.task('test', function() {
  gulp.src('spec/*_spec.js')
    .pipe(jasmine())
});

gulp.task('default', function(callback) {
  runSequence([
    'react',
    'browserSync',
    'scripts',
    'moveHtml',
    'moveVendor',
    'moveCss',
    'watch'
  ],
    callback
  )
});
