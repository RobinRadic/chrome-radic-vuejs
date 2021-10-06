import gulp from 'gulp'

gulp.task('build', gulp.series(
    'clean',
    'vendor',
    gulp.parallel(
        'manifest',
        'scripts',
        'styles',
        'pages',
        'locales',
        'images',
        'fonts',
        'chromereload'
    )
))
