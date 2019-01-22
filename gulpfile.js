const gulp=require('gulp')
sass=require('gulp-sass'),
browserSync=require('browser-sync').create();

gulp.task('sass',function(){
    return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss","assets/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("assets/css"));
});

gulp.task('js',function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("assets/scripts"))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest("assets/fonts"));
  });

gulp.task('serve', ['sass'], function(){
    browserSync.init({
      server: "./assets",
      notify:false
    });
  
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'assets/scss/*.scss'], ['sass']);
    gulp.watch("assets/*.html").on('change', browserSync.reload);
  });

  gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
      .pipe(gulp.dest("assets/css"));
  });

  gulp.task('default', ['js', 'serve', 'fa', 'fonts']);