'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    // sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    bc = './bower_components/';

gulp.task('js', function() {
  gulp.src('builds/development/component/**/*.js')
    .pipe(concat('app.js'))
     // .pipe(ngAnnotate())
     // .pipe(uglify())
    .pipe(gulp.dest('builds/dist/app/'))
});

gulp.task('html', function() {
  gulp.src('builds/development/**/*.html')
    .pipe(gulp.dest('builds/dist/'))
});

// gulp.task('img', function() {
//   gulp.src('builds/development/img/**')
//     .pipe(gulp.dest('builds/dist/img/'));
// });

// gulp.task('css', function () {
//   gulp.src('builds/development/style/**/*.css')
//       .pipe(concat('style.min.css'))
//       // .pipe(csso())
//       .pipe(gulp.dest('builds/dist/css/'));
// });

// gulp.task('css-ui', function () {
//   gulp.src(bc+'jquery-ui/themes/flick/jquery-ui.min.css')
//       .pipe(gulp.dest('builds/dist/css/'));
// });

// gulp.task('css-ui-themse', function () {
//   gulp.src(bc+'jquery-ui/themes/flick/theme.css')
//       .pipe(gulp.dest('builds/dist/css/'));
// });

// gulp.task('normalize', function () {
//   gulp.src(bc+'normalize-css/normalize.css')
//       .pipe(gulp.dest('builds/dist/css/'));
// });

gulp.task('watch', function() {
  gulp.watch('builds/development/component/**/*.js', ['js']);
  gulp.watch('builds/development/style/**/*.css', ['css']);
  gulp.watch('builds/development/**/*.html', ['html']);
  gulp.watch('builds/development/img/**/*', ['img']);
});

gulp.task('libs', function() {
  // gulp.src(bc+'jquery/dist/jquery.min.js')
  //     .pipe(gulp.dest('./builds/dist/libs/jquery/'));

  // gulp.src(bc+'jquery-ui/jquery-ui.min.js')
  //     .pipe(gulp.dest('./builds/dist/libs/jquery/'));

  // gulp.src(bc+'ngInfiniteScroll/build/ng-infinite-scroll.min.js')
  //     .pipe(gulp.dest('./builds/dist/libs/ngInfiniteScroll/'));

  // gulp.src([bc+'angular/angular.js',
  //           bc+'angular-animate/angular-animate.js',
  //           bc+'angular-cookies/angular-cookies.js',
  //           bc+'angular-i18n/angular-locale_ru-ru.js',
  //           bc+'angular-loader/angular-loader.js',
  //           bc+'angular-resource/angular-resource.js',
  //           bc+'angular-animate/angular-animate.js',
  //           bc+'angular-ui-router/release/angular-ui-router.js',
  //           bc+'angular-sanitize/angular-sanitize.js',
  //           bc+'angular-touch/angular-touch.js',
  //           bc+'firebase/firebase.js',
  //           bc+'angularfire/dist/angularfire.js'
  //         ])
  //     .pipe(concat('angular.concat.js'))
  //     // .pipe(uglify())
  //     .pipe(gulp.dest('./builds/dist/libs/angular/'));
});

gulp.task('webserver', function() {
  gulp.src('builds/dist/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('default', [
  // 'libs',
  'html',
  // 'img',
  // 'css',
  // 'css-ui',
  // 'css-ui-themse',
  'js',
  // 'normalize',
  // 'sass',
  'webserver',
  'watch'
]);
