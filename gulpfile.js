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


gulp.task('default',['nodemon','webpacker','sync'])

gulp.task('nodemon',function () {
  return nodemon({
    script: 'server/server.js',
    ext: 'js ejs',
    ignore: ['client','node_modules','server/views'],
    env: { 'NODE_ENV': 'dev' }
  });
});

gulp.task('sync', function () {
  console.log('Iniciando browser sync');
  var files = [
    'client/css/*.css',
    'client/scripts/**/*',
    'server/views/*.ejs'
  ];
  return browserSync.init(files, {
    proxy: 'localhost:' + config.port + '/',
    port:3001
  });
});


gulp.task('watch', function () {

  return watch('client/scripts/**/*.js', function () {
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



gulp.task('webpacker',function () {

  watch('client/scripts/**/**',function (file) {
    
    console.log(colors.rainbow('hubo un cambio!'))
    gulp.src([
      'client/'
    ])
    .pipe(webpack({
      entry:{
        app:'./client/scripts/app.js'
      },
      output:{
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.(png|woff|woff2|eot|ttf|svg|gif|html)$/, loader: 'url-loader?limit=100000' }
        ],
      },
    }))
    .on('error',function (err) {
      console.error('Opsie'.red);
      console.error(err)
    })
    .pipe(uglify())
    .on('error',function (err) {
      console.error('Opsie'.red);
      console.error(err)
    })
    .pipe(gulp.dest('client/js/'));

  });
});
