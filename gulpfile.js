var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var lint = require('gulp-eslint'); // Lint JS files, including JSX

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

gulp.task('inject', function(){
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var injectSrc = gulp.src(['./public/css/*.css',
                            './public/js/*.js'], {read: false});

 var injectOptions = {
   ignorePath: '/public'
 };

  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };

  return gulp.src('./src/views/*.hbs')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function(){
  var options = {
      script: 'app.js',
      delayTime: 1,
      env: {
        'PORT': 5000
      },
      watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function(env){
      console.log('Restarting...');
    });
});

gulp.task('mocha', function(){
    return gulp.src(['test/*.js'], {read:false})
      .pipe(mocha({reporter: 'list'}))
      .on('error', gutil.log);
});

gulp.task('watch-mocha', function(){
    gulp.run('mocha');
    gulp.watch(['./**/*.', 'test/**/*.js'], ['mocha']);
});

gulp.task('lint', function() {
  return gulp.src(jsFiles).pipe(lint({
    'rules':{
        'quotes': [1, 'single'],
        'semi': [1, 'always']
    }
  }))
  .pipe(lint.format())
  // Brick on failure to be super strict
  .pipe(lint.failOnError());
});

gulp.task('default', ['style', 'watch-mocha']);
