<?php


namespace App\Classes\Tests;

use Illuminate\Testing\TestResponse;

/**
 * Class TestResponseMixin
 * @package App\Classes\Tests
 *
 * @mixin TestResponse
 */
class TestResponseMixin
{
    /**
     * Assert the response contains an error from the given category.
     *
     * @return \Closure
     */
    public function assertGraphQLErrorCode(): \Closure
    {
        return function (string $code) {
            $this->assertJson([
                'errors' => [
                    [
                        'extensions' => [
                            'code' => $code,
                        ],
                    ],
                ],
            ]);

            return $this;
        };
    }

}
