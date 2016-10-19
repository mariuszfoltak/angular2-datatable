module.exports = function (config) {

    var appBase = 'lib/';       // transpiled app JS and map files
    var appSrcBase = 'src/';       // app source TS files
    var appAssets = '/base/lib/'; // component assets fetched by Angular's compiler

    config.set({

        basePath: '.',

        frameworks: ['jasmine'],

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],

        customLaunchers: {
            // From the CLI. Not used here but interesting
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        files: [
            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',

            // Polyfills
            'node_modules/core-js/client/shim.js',

            // Zone.js
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            // RxJs
            {
                pattern: 'node_modules/rxjs/**/*.js',
                included: false,
                watched: false
            },
            {
                pattern: 'node_modules/rxjs/**/*.js.map',
                included: false,
                watched: false
            },

            // Angular 2
            {
                pattern: 'node_modules/@angular/**/*.js',
                included: false,
                watched: false
            },
            {
                pattern: 'node_modules/@angular/**/*.js.map',
                included: false,
                watched: false
            },

            // Lodash
            {
                pattern: 'node_modules/lodash/lodash.js',
                included: false,
                watched: false
            },

            // The testing library
            {
                pattern: 'systemjs.config.js',
                included: false,
                watched: false
            },
            'karma-test-shim.js',

            // transpiled application & spec code paths loaded via module imports
            {
                pattern: appBase + '**/*.js',
                included: false,
                watched: true
            },

            // asset (HTML & CSS) paths loaded via Angular's component compiler
            // (these paths need to be rewritten, see proxies section)
            {
                pattern: appBase + '**/*.html',
                included: false,
                watched: true
            },
            {
                pattern: appBase + '**/*.css',
                included: false,
                watched: true
            },

            // paths for debugging with source maps in dev tools
            {
                pattern: appSrcBase + '**/*.ts',
                included: false,
                watched: false
            },
            {
                pattern: appBase + '**/*.js.map',
                included: false,
                watched: false
            }
        ],

        // proxied base paths for loading assets
        proxies: {
            // required for component assets fetched by Angular's compiler
            "/lib/": appAssets
        },

        exclude: [],

        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'lib/**/!(*spec).js': ['coverage']
        },

        // Coverage reporter generates the coverage
        reporters: ['progress', 'dots', 'coverage'],

        coverageReporter: {
            reporters: [
                {
                    type: 'json',
                    subdir: '.',
                    file: 'coverage-final.json'
                }
            ]
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: true
    })
};
