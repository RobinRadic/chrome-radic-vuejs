import { copySync } from 'fs-extra';
import gulp from 'gulp';
import log from 'gulplog';
import { dependencies, path } from './lib/utils';

export function copyPaths(destination) {
    log.info('copyPaths with dependencies');
    log.info({ dependencies });
    for ( const dep of dependencies ) {

        const srcPath  = path('node_modules', dep);
        const destPath = path(destination, dep);
        log.info(`Copying ${dep} to ${destPath}`);
        copySync(srcPath, destPath, { recursive: true });
    }

}

gulp.task('vendor', done => {
    copyPaths('dist/chrome/vendor');
    copyPaths('app/vendor');
    done();
});
