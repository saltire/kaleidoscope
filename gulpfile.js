'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const less = require('gulp-less');
const run = require('gulp-run');


gulp.task('babel', () => {
    gulp.src('js/*.js')
        .pipe(babel({presets: ['es2015', 'react']}))
        .on('error', (err) => console.log('Error parsing with Babel:', err.message))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
    gulp.src('less/*.less')
        .pipe(less())
        .on('error', (err) => console.log('Error parsing LESS:', err.message))
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', () => {
    gulp.src(
        [
            'node_modules/react/dist/react.js',
            'node_modules/react-dom/dist/react-dom.js'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('static', () => {
    gulp.src('static/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('watch', () => {
    gulp.watch('js/*.js', ['babel']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch('static/*', ['static']);
});

gulp.task('gh-pages', () => {
    run('git subtree push --prefix dist origin gh-pages').exec();
});

gulp.task('build', ['babel', 'less', 'libs', 'static']);
gulp.task('publish', ['build', 'gh-pages']);
gulp.task('default', ['build', 'serve', 'watch']);
