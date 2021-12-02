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
    .react();
    //.sass('resources/sass/app.scss', 'public/css');

mix
    .webpackConfig({
        resolve: {
            extensions: [".js", ".jsx", ".tsx"],
            alias: {
                '@paymenu': path.resolve(__dirname, 'resources/js'),
            }
        }
    });

if (mix.inProduction()) {
    mix.version()
}
