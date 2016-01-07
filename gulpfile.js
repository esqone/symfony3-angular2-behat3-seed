var gulp = require('gulp');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var tinylr = require('tiny-lr');
const del = require('del');
const tsConfigGlob = require('tsconfig-glob');
var sourcemaps = require('gulp-sourcemaps');

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del([
        'web/app',
        'web/css',
        'web/lib',
        'web/styles',
        'web/templates',
        'web/app-config.js'
    ]);
});

// stubbed out function (to implement later)
function notifyLiveReload(event) {
    var fileName = require('path')
        .relative(__dirname + '/web', event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('setup', function () {
    gulp.src([
        'app/Resources/js_libs/custom-require.js',
        'node_modules/es6-shim/es6-shim*.js',
        'node_modules/es6-promise/dist/es6-promise*.js',
        'node_modules/systemjs/dist/*.*',
        'node_modules/jquery/dist/jquery.*js',
        'node_modules/bootstrap/dist/js/bootstrap*.js',
        'node_modules/reflect-metadata/Reflect.js'
    ]).pipe(gulp.dest('web/lib'));

    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css'
    ]).pipe(gulp.dest('web/css'));

    gulp.src([
        'node_modules/rxjs/**/*.js'
    ]).pipe(gulp.dest('web/lib/rxjs'));

    gulp.src([
        'node_modules/angular2/**/*.js'
    ]).pipe(gulp.dest('web/lib/angular2'));
    gulp.src([
        'scripts/app-config.js'
    ]).pipe(gulp.dest('web'));
});

gulp.task('tsconfig-glob', function () {
    return tsConfigGlob({
        configPath: '.',
        indent: 2
    });
});

gulp.task('assets', function () {
    gulp.src(['./scripts/app/**/*.json',
            './scripts/app/**/*.html',
            './scripts/app/**/*.css'])
        .pipe(gulp.dest('./web/app'));
});

gulp.task('watch', [
    'watch.assets',
    'watch.ts',
    'watch.web'
    //'tsconfig-glob'
]);

gulp.task('watch.assets', ['assets'], function () {
    return gulp.watch([
            './scripts/app/**/*.json',
            './scripts/app/**/*.html',
            './scripts/app/**/*.css'],
        ['assets']
    );
});

gulp.task('express', function () {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({
        port: 35729
    }));
    app.use(express.static(__dirname + '/web'));
    app.listen(4000, '0.0.0.0');
});

gulp.task('livereload', function () {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});


// calls the typescript compiler whenever
// any typescript files change
gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('scripts/app/**/*.ts', ['ts']);
});

// if we change any files in the web directory
// reload the page - this is for when we
// update any of our assets with the
// setup command or drop a file in the content
// area of web like a css file...
gulp.task('watch.web', function () {
    gulp.watch('web/**', notifyLiveReload);
});


// replace the Gulp task for ts with this:

gulp.task('ts', function (done) {
    var tsProject = ts.createProject('tsconfig.json', {
        typescript: typescript
    });

    return gulp.src(['scripts/app/**/**.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('../maps', {
            includeContent: false,
            sourceRoot: '/scripts/app'
        }))
        .pipe(gulp.dest('web/app'));
});


gulp.task('default', [
    'setup',
    'express',
    'livereload',
    'watch'
]);
