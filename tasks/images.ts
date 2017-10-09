import * as gulp from 'gulp'
import * as gulpif from 'gulp-if'
import * as imagemin from 'gulp-imagemin'
import * as livereload from 'gulp-livereload'
import args from './lib/args'

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulpif(args.production, imagemin()))
    .pipe(gulp.dest(`dist/${args.vendor}/images`))
    .pipe(gulpif(args.watch, livereload()))
})
