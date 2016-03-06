var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  nodemon = require('gulp-nodemon'),
  colors = require('colors'),
  sourcemaps = require('gulp-sourcemaps'),
  // ngAnnotate = require('gulp-ng-annotate'),
  // babel = require('gulp-babel'),
  browserSync = require('browser-sync');

var webpack = require('webpack-stream');

var config = require('./server/config/config.json');


gulp.task('default',['sync','nodemon','watch'])

gulp.task('nodemon',function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js ejs',
    ignore: ['public','node_modules'],
    env: { 'NODE_ENV': 'dev' }
  });
});

gulp.task('sync', function () {
  console.log('Iniciando browser sync');
  var files = [
    'public/css/*.css',
    'client/scripts/**/*',
    'public/styles/*.css',
    'views/*.ejs'
  ];
  browserSync.init(files, {
    proxy: 'localhost:' + config.port + '/',
    port:3001
  });
});


gulp.task('watch', function () {

  watch('client/scripts/**/*.js', function () {
    console.log('hubo un cambio');
    gulp.src(
        [
        // 'client/scripts/bundle.js',
        'client/scripts/app.js',
        'client/scripts/**/*.js',
      ],{base: 'client/scripts/'})
      // .pipe(ngAnnotate())
      .pipe(sourcemaps.init())
      // .pipe(babel({
      //   presets: ['es2015']
      // }))
      .pipe(concat('build.js'))
      .pipe(uglify())
      .on('error',function (err) {
        console.error('Opsie'.red);
        console.error(err)
      })
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('client/js/'));
  });

});

gulp.task('webpack',function () {
  return gulp.src('client/entry.js')
    .pipe(webpack({
      entry:{
        app:'./client/scripts/app.js'
      },
      output:{
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' },
        ],
      },
    }))
    // lo omitiremos, mejor lo haremos con gulp
    // .pipe(uglify())
    .pipe(gulp.dest('client/scripts/'));
});
