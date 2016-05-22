'use strict';

var path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  eslint = require('gulp-eslint'),
  gulpIf = require('gulp-if');

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint && file.eslint.fixed;
}


gulp.task('lint', function () {
  return gulp.src([
    path.join(conf.paths.src, '/*.js'),
    path.join(conf.paths.src, '/**/*.js')
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('lint-fix', function () {
  return gulp.src([
    path.join(conf.paths.src, '/*.js'),
    path.join(conf.paths.src, '/**/*.js')
  ])
  .pipe(eslint({
    fix: true
  }))
  .pipe(eslint.format())
  // if fixed, write the file to dest
  .pipe(gulpIf(isFixed, gulp.dest(conf.paths.src)));
});
