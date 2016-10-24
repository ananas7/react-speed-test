const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');

gulp.task('build', () => {
    return browserify({
            entries: './src/index.jsx',
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./target/'));
});
