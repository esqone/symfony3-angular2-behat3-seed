System.config({
    defaultJSExtensions: true,
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    },
    paths: {
        'angular2/*': 'lib/angular2/*.js',
        'rxjs/observable/*': 'lib/rxjs/observable/*.js',
        'rxjs/operator/*': 'lib/rxjs/operator/*.js',
        'rxjs/*': 'lib/rxjs/*.js',
        './Subject': 'lib/rxjs/Subject.js'
    }
});
