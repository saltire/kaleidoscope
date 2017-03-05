'use strict';

const babelify = require('babelify');
const browserify = require('browserify');
const gulp = require('gulp');
const connect = require('gulp-connect');
const less = require('gulp-less');
const run = require('gulp-run');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const vueify = require('vueify');


gulp.task('browserify', () => {
    browserify('js/form.js')
        .transform(vueify)
        .transform(babelify)
        .bundle()
        .on('error', (err) => console.log('Error parsing with Browserify:', err.message))
        .pipe(source('form.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
    gulp.src('less/*.less')
        .pipe(less())
        .on('error', (err) => console.log('Error parsing LESS:', err.message))
        .pipe(gulp.dest('dist'));
});

gulp.task('static', () => {
    gulp.src('static/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
    connect.server({
        root: 'dist',
        port: process.env.PORT || 5000
    });
});

gulp.task('watch', () => {
    gulp.watch(['js/*.js', 'vue/*.vue'], ['browserify']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch('src/*', ['src']);
});

gulp.task('publish', () => {
    run('git subtree push --prefix dist origin gh-pages').exec();
});

gulp.task('build', ['browserify', 'less', 'static']);
gulp.task('default', ['build', 'serve', 'watch']);
