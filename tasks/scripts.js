"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = __importDefault(require("gulp"));
var gulp_if_1 = __importDefault(require("gulp-if"));
var gulp_util_1 = require("gulp-util");
var vinyl_named_1 = __importDefault(require("vinyl-named"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_stream_1 = __importDefault(require("webpack-stream"));
var gulp_plumber_1 = __importDefault(require("gulp-plumber"));
var gulp_livereload_1 = __importDefault(require("gulp-livereload"));
var args_1 = __importDefault(require("./lib/args"));
var pluginWebpack4_1 = __importDefault(require("vue-loader/dist/pluginWebpack4"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var path_1 = require("path");
var glob_1 = __importDefault(require("glob"));
var fs_1 = require("fs");
var ENV = args_1.default.production ? 'production' : 'development';
var path = function () {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return path_1.resolve.apply(void 0, __spreadArray([process.cwd()], parts, false));
};
var move = function () {
    var globPath = path('dist/chrome/scripts/styles/*.css');
    console.log('move() globPath', globPath);
    var filePaths = glob_1.default.sync(globPath);
    console.log('move() filePaths', filePaths);
    var dirPath = path('dist/chrome/styles');
    if (!(0, fs_1.existsSync)(dirPath)) {
        (0, fs_1.mkdirSync)(dirPath, {
            recursive: true,
            mode: 511,
        });
    }
    filePaths.forEach(function (filePath) {
        var destPath = path('dist/chrome/styles', (0, path_1.basename)(filePath));
        console.log('move ', filePath, '  --->  ', destPath);
        (0, fs_1.renameSync)(filePath, destPath);
    });
};
gulp_1.default.task('scripts', function (cb) {
    var plugins = [
        new pluginWebpack4_1.default(),
        new mini_css_extract_plugin_1.default({
            filename: "styles/[name].css",
        }),
        new webpack_1.default.optimize.SplitChunksPlugin({
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                },
            },
        }),
        new webpack_1.default.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV),
            'process.env.VENDOR': JSON.stringify(args_1.default.vendor),
        }),
    ];
    var config = {
        devtool: args_1.default.sourcemaps ? 'inline-source-map' : false,
        watch: args_1.default.watch,
        mode: 'none',
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/.vue$/],
                        // configFile       : 'webpack.tsconfig.json',
                        transpileOnly: true,
                        logLevel: 'INFO',
                        logInfoToStdOut: true,
                        // experimentalWatchApi: true,
                        happyPackMode: true,
                        compilerOptions: {
                            target: 'es5',
                            module: 'commonjs',
                            importHelpers: false,
                        },
                    },
                },
                {
                    test: /\.d\.ts$/,
                    loader: 'ignore-loader',
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        mini_css_extract_plugin_1.default.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sassOptions: {
                                    fiber: false,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        externals: {
            'vue': 'Vue',
            'vue-class-component': 'VueClassComponent',
            'vue-property-decorator': 'VuePropertyDecorator',
            'lodash': '_',
            'jquery': 'jQuery'
        },
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.scss'],
            modules: [
                'node_modules/',
                'app/scripts/',
            ],
        },
    };
    return gulp_1.default.src(['app/scripts/*.js', 'app/scripts/*.ts'])
        .pipe((0, gulp_plumber_1.default)({
        // Webpack will log the errors
        errorHandler: function () { },
    }))
        .pipe((0, vinyl_named_1.default)())
        .pipe((0, webpack_stream_1.default)(config, webpack_1.default, function (err, stats) {
        if (err)
            return;
        (0, gulp_util_1.log)("Finished '" + gulp_util_1.colors.cyan('scripts') + "'", stats.toString({
            chunks: false,
            colors: true,
            cached: false,
            children: false,
        }));
        setTimeout(function () {
            move();
        }, 1000);
    }))
        .pipe(gulp_1.default.dest("dist/" + args_1.default.vendor + "/scripts"))
        .pipe((0, gulp_if_1.default)(args_1.default.watch, (0, gulp_livereload_1.default)()));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjcmlwdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsb0RBQTZCO0FBQzdCLHVDQUF3QztBQUN4Qyw0REFBZ0M7QUFDaEMsb0RBQThCO0FBQzlCLGtFQUF5QztBQUV6Qyw4REFBbUM7QUFDbkMsb0VBQXlDO0FBQ3pDLG9EQUE4QjtBQUM5QixrRkFBNkQ7QUFDN0Qsb0ZBQTJEO0FBQzNELDZCQUF5QztBQUN6Qyw4Q0FBd0I7QUFDeEIseUJBQXVEO0FBR3ZELElBQU0sR0FBRyxHQUFJLGNBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQzVELElBQU0sSUFBSSxHQUFHO0lBQUMsZUFBUTtTQUFSLFVBQVEsRUFBUixxQkFBUSxFQUFSLElBQVE7UUFBUiwwQkFBUTs7SUFBSyxPQUFBLGNBQU8sOEJBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFLLEtBQUs7QUFBL0IsQ0FBZ0MsQ0FBQztBQUM1RCxJQUFNLElBQUksR0FBRztJQUNULElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFekMsSUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzNDLElBQUssQ0FBQyxJQUFBLGVBQVUsRUFBQyxPQUFPLENBQUMsRUFBRztRQUN4QixJQUFBLGNBQVMsRUFBQyxPQUFPLEVBQUU7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUks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