FROM php:8-fpm-alpine as build

# Dependencies
RUN apk --update --no-cache add \
    git curl composer \
    php8-phar php8-tokenizer php8-zip php8-curl php8-mbstring \
    php8-dom php8-xml php8-xmlwriter php8-ctype php8-intl php8-pecl-uuid \
    php8-bcmath php8-gmp php8-pdo_sqlite php8-sodium php8-sysvsem \
    php8-pcntl php8-fileinfo php8-iconv php8-posix php8-gd php8-pecl-xdebug php8-simplexml php8-json

RUN ln -nsf /usr/bin/php8 /usr/bin/php
RUN rm -rf /var/cache/apk/*


FROM build as App

RUN apk --update --no-cache add \
    php8-pdo php8-pgsql php8-pdo_pgsql nano wget postgresql-dev

# RUN apk add --no-cache --virtual \
RUN    docker-php-ext-install pdo && \
    docker-php-ext-install pdo_pgsql && \
    # docker-php-ext-install opcache && \
    docker-php-ext-install exif
    # apk del build-essentials && rm -rf /usr/src/php*
    # Enable zip
    # build-essentials icu-dev icu-libs zlib-dev g++ make automake autoconf libzip-dev \
    # docker-php-ext-install zip && \
    # Enable gd
    # libpng-dev libwebp-dev libjpeg-turbo-dev freetype-dev && \
    # docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp && \
    # docker-php-ext-install gd && \

    # The Internationalization extension (Intl) is a wrapper for the ICU library
    # docker-php-ext-install intl && \


# RUN wget https://getcomposer.org/composer-stable.phar -O /usr/local/bin/composer && chmod +x /usr/local/bin/composer

# Cleanup
RUN rm -rf /var/cache/apk/*

WORKDIR /var/www/html/
EXPOSE 8000
CMD ["php", "artisan", "serve",  "--host=0.0.0.0"]