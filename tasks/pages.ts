import * as gulp from 'gulp'
import * as gulpif from 'gulp-if'
import * as livereload from 'gulp-livereload'
import args from './lib/args'

gulp.task('pages', () => {
  return gulp.src('app/pages/**/*.html')
    .pipe(gulp.dest(`dist/${args.vendor}/pages`))
    .pipe(gulpif(args.watch, livereload()))
})
