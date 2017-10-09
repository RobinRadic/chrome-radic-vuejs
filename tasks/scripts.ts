import * as gulp from 'gulp'
import * as gulpif from 'gulp-if'
import { log, colors } from 'gulp-util'
import * as named from 'vinyl-named'
import * as webpack from 'webpack'
import * as gulpWebpack from 'webpack-stream'
import * as plumber from 'gulp-plumber'
import * as livereload from 'gulp-livereload'
import args from './lib/args'

const ENV = args.production ? 'production' : 'development'

gulp.task('scripts', (cb) => {
  return gulp.src(['app/scripts/*.js', 'app/scripts/*.ts'])
    .pipe(plumber({
      // Webpack will log the errors
      errorHandler () {}
    }))
    .pipe(named())
    .pipe(gulpWebpack({
      devtool: args.sourcemaps ? 'inline-source-map' : false,
      watch: args.watch,
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(ENV),
          'process.env.VENDOR': JSON.stringify(args.vendor)
        })
      ].concat(args.production ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
      ] : []),
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [
          'node_modules/',
          'app/scripts/'
        ]
      }
    },
    webpack,
    (err, stats) => {
      if (err) return
      log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
        chunks: false,
        colors: true,
        cached: false,
        children: false
      }))
    }))
    .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
    .pipe(gulpif(args.watch, livereload()))
})