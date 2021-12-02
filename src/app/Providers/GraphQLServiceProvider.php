<?php


namespace App\Providers;


use App\Classes\Tests\TestResponseMixin;
use Illuminate\Foundation\Testing\TestResponse;
use Illuminate\Support\ServiceProvider;
use Nuwave\Lighthouse\Exceptions\DefinitionException;
use Nuwave\Lighthouse\Schema\TypeRegistry;
use Nuwave\Lighthouse\Schema\Types\LaravelEnumType;

class GraphQLServiceProvider extends ServiceProvider
{

    function register()
    {

        if (class_exists('Illuminate\Testing\TestResponse')) {
            \Illuminate\Testing\TestResponse::mixin(new TestResponseMixin());
        } elseif (class_exists('Illuminate\Foundation\Testing\TestResponse')) {
            TestResponse::mixin(new TestResponseMixin());
        }

    }

    /**
     * Bootstrap any application services.
     *
     * @param TypeRegistry $typeRegistry
     * @return void
     * @throws DefinitionException
     */
    public function boot(TypeRegistry $typeRegistry): void
    {

    }

}
