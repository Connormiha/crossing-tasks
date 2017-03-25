'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const stylint = require('gulp-stylint');
const {execSync} = require('child_process');

const PRE_COMMIT = process.env.NODE_ENV === 'pre_commit';

let changedFiles;
let changedFilesTypescript;
let changedFilesStylus;

if (PRE_COMMIT) {
    changedFiles = execSync('git diff --cached --name-only --diff-filter=ACM src __tests__', {encoding: 'utf8'});
    changedFiles = changedFiles.split('\n');
    changedFilesTypescript = changedFiles.filter((item) => /\.tsx?$/.test(item) && !/\.d\.ts$/.test(item));
    changedFilesStylus = changedFiles.filter((item) => /\.styl$/.test(item));
}

/**
 *
 * @desc Check TypeScript validation
 */
gulp.task('tslint', () =>
    gulp.src(PRE_COMMIT ? changedFilesTypescript : ['{src,__tests__}/**/*.{ts,tsx}', '!src/**/*.d.ts'])
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({emitError: PRE_COMMIT}))
);

/**
 *
 * @desc Check stylus validation
 */
gulp.task('styluslint', () =>
    gulp.src(PRE_COMMIT ? changedFilesStylus : ['src/**/*.styl'])
        .pipe(stylint())
        .pipe(stylint.reporter())
        .pipe(stylint.reporter('fail', {failOnWarning: PRE_COMMIT}))
);

/**
* validation Stylus and TypeScript
*/
gulp.task('lint', ['tslint', 'styluslint']);
