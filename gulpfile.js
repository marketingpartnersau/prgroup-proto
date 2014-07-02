// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    bowersrc = require('gulp-bower-src'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    //imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    filter = require('gulp-filter'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    //cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
    watch = require('gulp-watch');

var paths = {
  vendor : [
    'bower_components/angular/angular.js',
  ],
  scripts : ['src/coffee/**/*.coffee'],
  styles : ['src/scss/app.scss']
}

// Styles
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(watch(function(files){
      return files.pipe(sass({ style: 'expanded', }).on('error', gutil.log))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('assets/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('assets/css'))
      .pipe(notify({ message: 'Styles task complete' }));
    }));
});

gulp.task('bower', function(){
  gulp.src(paths.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

// Scripts
gulp.task('scripts', function() {

  return gulp.src(paths.scripts)
    .pipe(watch(function(files){
      return files.pipe(coffee({bare: true}).on('error', gutil.log))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(concat('app.js'))
      .pipe(gulp.dest('assets/js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js'))
      .pipe(notify({ message: 'Scripts task complete' }));
    }));
});

// Images
// gulp.task('images', function() {
//   return gulp.src('src/images/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

// Clean
gulp.task('clean', function() {
  //return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
  return gulp.src(['assets/css'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    //gulp.start('styles', 'scripts', 'images');
    gulp.start('styles', 'scripts', 'bower');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch bower components
  //gulp.watch('bower_components/**', ['bower']);

  // Watch .js files
  gulp.watch('src/coffee/**/*.coffee', ['scripts']);

  // Watch image files
  //gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  var server = livereload();

  // Watch any files in dist/, reload on change
  gulp.watch(['**/*.scss', '**/*.html']).on('change', function(file) {
    server.changed(file.path);
  });

});