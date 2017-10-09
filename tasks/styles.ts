import * as gulp from 'gulp'
import * as gulpif from 'gulp-if'
import * as gutil from 'gulp-util'
import * as sourcemaps from 'gulp-sourcemaps'
import * as less from 'gulp-less'
import * as sass from 'gulp-sass'
import * as cleanCSS from 'gulp-clean-css'
import * as livereload from 'gulp-livereload'
import args from './lib/args'

gulp.task('styles:css', function () {
  return gulp.src('app/styles/*.css')
    .pipe(gulpif(args.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(args.production, cleanCSS()))
    .pipe(gulpif(args.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(`dist/${args.vendor}/styles`))
    .pipe(gulpif(args.watch, livereload()))
})

gulp.task('styles:less', function () {
  return gulp.src('app/styles/*.less')
    .pipe(gulpif(args.sourcemaps, sourcemaps.init()))
    .pipe(less({ paths: ['./app'] }).on('error', function (error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message))
      this.emit('end')
    }))
    .pipe(gulpif(args.production, cleanCSS()))
    .pipe(gulpif(args.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(`dist/${args.vendor}/styles`))
    .pipe(gulpif(args.watch, livereload()))
})

gulp.task('styles:sass', function () {
  return gulp.src('app/styles/*.scss')
    .pipe(gulpif(args.sourcemaps, sourcemaps.init()))
    .pipe(sass({ includePaths: ['./app'] }).on('error', function (error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message))
      this.emit('end')
    }))
    .pipe(gulpif(args.production, cleanCSS()))
    .pipe(gulpif(args.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(`dist/${args.vendor}/styles`))
    .pipe(gulpif(args.watch, livereload()))
})

gulp.task('styles', [
  'styles:css',
  'styles:less',
  'styles:sass'
])
