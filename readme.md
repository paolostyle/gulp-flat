# gulp-flat
Gulp plugin for flattening/unflattening JSON files using
[flat](https://www.npmjs.com/package/flat) package.

## Installation

```
npm install gulp-flat --save-dev
```

or

```
yarn add gulp-flat --dev
```

## Usage
```js
var gulp = require('gulp');
var flatten = require('gulp-flat');
var unflatten = require('gulp-flat').unflatten;

var options = {}; // optional, see flat docs for specific information

gulp.task('flatten-json', function () {
    return gulp.src('file.json')
        .pipe(flatten(options))
        .pipe(gulp.dest('dist'));
});

gulp.task('unflatten-json', function () {
    return gulp.src('file.json')
        .pipe(unflatten(options))
        .pipe(gulp.dest('dist'));
});
```

## Options
See [flat](https://www.npmjs.com/package/flat#options) options.

## Notes
Output files are indented like the original ones, unless there are no
indents at all or something is wrong with them, in which case they are
set to 2 spaces. Use separate plugin if you want your files minified.