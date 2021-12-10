const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/index.tsx', 'public/js')
    .react()
    .webpackConfig({
        resolve: {
            extensions: [".js", ".jsx", ".tsx"],
            alias: {
                '@fe': path.resolve(__dirname, 'resources/js'),
            }
        }
    })

if (!mix.inProduction()) {
    mix.browserSync({
        codeSync: true,

        proxy: "localhost:8080",
        files: "resources/js/**",
        ui: false,
        hmrOptions: {
            host: "localhost",
            port: 3000
        }
    });
}

if (mix.inProduction()) {
    mix.disableNotifications();
    mix.version()
}
