import * as gulp from 'gulp'
import * as del from 'del'
import args from './lib/args'

gulp.task('clean', () => {
  return del(`dist/${args.vendor}/**/*`)
})
