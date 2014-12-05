var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
  jsPath: './assets/javascripts',
  lessPath: './assets/stylesheets',
  bowerDir: './bower_components'
}

gulp.task('bower', function() { 
  return $.bower().pipe(gulp.dest(config.bowerDir)) ;
});

gulp.task('css', function() { 
  return gulp.src(config.lessPath + '/*-inputs.less')
          .pipe($.less({
             paths: [
                 config.lessPath,
                 config.bowerDir + '/bootstrap/less'
             ]
          }) )
         .pipe($.autoprefixer('last 2 version'))
          .pipe(gulp.dest('./dist/css'))
         .pipe(reload({stream:true}))
         .pipe($.minifyCss())
         .pipe($.rename({suffix: '-min'}))
         .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
  return gulp.src(config.jsPath + '/inputs.js')
         .pipe(gulp.dest('./dist/js'))
         .pipe(reload({stream:true}))
         .pipe($.uglify())
         .pipe($.rename({suffix: '-min'}))
         .pipe(gulp.dest('./dist/js'));
});

 gulp.task('watch', function() {
   gulp.watch(config.lessPath + '/**/*.less', ['css']); 
  gulp.watch(config.jsPath + '/**/*.js', ['js']); 
  gulp.watch('./index.html', reload);
});

gulp.task('serve', ['watch'], function() {
  browserSync({
    server: {
      baseDir: ['./']
    }
  });
});

gulp.task('default', ['bower', 'css', 'js']);
