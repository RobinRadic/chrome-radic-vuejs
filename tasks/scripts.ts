import gulp from 'gulp';
import gulpif from 'gulp-if';
import { colors, log } from 'gulp-util';
import named from 'vinyl-named';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import BabiliPlugin from 'babili-webpack-plugin';
import plumber from 'gulp-plumber';
import livereload from 'gulp-livereload';
import args from './lib/args';
import VueLoaderPlugin from 'vue-loader/dist/pluginWebpack4';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { basename, resolve } from 'path';
import glob from 'glob';
import { existsSync, mkdirSync, renameSync } from 'fs';
import { getWebpackAliases } from './lib/utils';

const ENV  = args.production ? 'production' : 'development';
const path = (...parts) => resolve(process.cwd(), ...parts);
const move = () => {
    const globPath = path('dist/chrome/scripts/styles/*.css');
    console.log('move() globPath', globPath);

    const filePaths = glob.sync(globPath);
    console.log('move() filePaths', filePaths);
    const dirPath = path('dist/chrome/styles');
    if ( !existsSync(dirPath) ) {
        mkdirSync(dirPath, {
            recursive: true,
            mode     : 0o777,
        });
    }
    filePaths.forEach(filePath => {
        const destPath = path('dist/chrome/styles', basename(filePath));
        console.log('move ', filePath, '  --->  ', destPath);
        renameSync(filePath, destPath);
    });
};

gulp.task('scripts', (cb) => {
    const plugins = [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `styles/[name].css`,
        }),
        new (webpack.optimize as any).SplitChunksPlugin({
            cacheGroups: {
                vendor: {
                    name  : 'vendor',
                    test  : /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                },
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV),
            'process.env.VENDOR'  : JSON.stringify(args.vendor),
        }),
    ];

    const config:webpack.Configuration = {
        devtool    : args.sourcemaps ? 'inline-source-map' : false,
        watch      : args.watch,
mode:'none',
        plugins,
        module     : {
            rules: [
                {
                    test   : /\.ts$/,
                    loader : 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [ /.vue$/ ],
                        // configFile       : 'webpack.tsconfig.json',
                        transpileOnly  : true,
                        logLevel       : 'INFO',
                        logInfoToStdOut: true,
                        // experimentalWatchApi: true,
                        happyPackMode  : true,
                        compilerOptions: {
                            target       : 'es5',
                            module       : 'commonjs',
                            importHelpers: false,

                        },
                    },
                },
                {
                    test  : /\.d\.ts$/,
                    loader: 'ignore-loader',
                },
                {
                    test  : /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.s[ac]ss$/i,
                    use : [
                        MiniCssExtractPlugin.loader, //"style-loader",
                        'css-loader',
                        {
                            loader : 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sassOptions   : {
                                    fiber: false,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        performance: {
            hints            : false,
            maxEntrypointSize: 512000,
            maxAssetSize     : 512000,
        },
        externals: {
            'vue': 'Vue',
            'vue-class-component': 'VueClassComponent',
            'vue-property-decorator': 'VuePropertyDecorator',
            'lodash': '_',
            'jquery': 'jQuery'
        },
        resolve    : {
            extensions: [ '.ts', '.js', '.vue', '.scss' ],
            modules   : [
                'node_modules/',
                'app/scripts/',
            ],
        },
    };


    return gulp.src([ 'app/scripts/*.js', 'app/scripts/*.ts' ])
               .pipe(plumber({
                   // Webpack will log the errors
                   errorHandler() {},
               }))
               .pipe(named())
               .pipe(gulpWebpack(config,
                   webpack,
                   (err, stats) => {
                       if ( err ) return;
                       log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                           chunks  : false,
                           colors  : true,
                           cached  : false,
                           children: false,
                       }));
                       setTimeout(() => {
                           move();
                       }, 1000);

                   }))
               .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
               .pipe(gulpif(args.watch, livereload()));

});
