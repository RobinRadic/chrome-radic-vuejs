import * as gulp from 'gulp'
import * as gulpif from 'gulp-if'
import * as livereload from 'gulp-livereload'
import args from './lib/args'

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*.{woff,woff2,ttf,eot,svg}')
    .pipe(gulp.dest(`dist/${args.vendor}/fonts`))
    .pipe(gulpif(args.watch, livereload()))
})
