const gulp = require('gulp');
const flatten = require('./index.js');
const unflatten = require('./index.js').unflatten;

gulp.task('flatten-json',
    () => gulp.src('test/input/*')
            .pipe(flatten())
            .pipe(gulp.dest('test/output'))
);

gulp.task('unflatten-json',
    () => gulp.src('dist/*')
        .pipe(unflatten())
        .pipe(gulp.dest('dist2'))
);