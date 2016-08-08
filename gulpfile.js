'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');


gulp.task('babel', () => {
    gulp.src('js/*.js')
        .pipe(babel({presets: ['es2015', 'react']}))
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
    gulp.watch('static/*', ['static']);
});

gulp.task('build', ['babel', 'libs', 'static']);
gulp.task('default', ['build', 'serve', 'watch']);
