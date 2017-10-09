import * as gulp from 'gulp'
import * as gulpSequence from 'gulp-sequence'

gulp.task('build', gulpSequence(
  'clean', [
    'manifest',
    'scripts',
    'styles',
    'pages',
    'locales',
    'images',
    'fonts',
    'chromereload'
  ]
))
