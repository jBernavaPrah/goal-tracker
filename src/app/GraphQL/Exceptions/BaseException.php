<?php


namespace App\GraphQL\Exceptions;


use Exception;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\ArrayShape;
use Nuwave\Lighthouse\Exceptions\RendersErrorsExtensions;
use ReflectionClass;

abstract class BaseException extends Exception implements RendersErrorsExtensions
{

    protected bool $isClientSafe = true;

    /**
     * @inheritDoc
     */
    public function isClientSafe(): bool
    {
        return $this->isClientSafe;
    }

    abstract public function getCategory(): string;

    /**
     * Return the error name, in snake case, without "Exception", used on the extensions content array.
     *
     * @return string
     */
    protected function getErrorCode(): string
    {
        return strtoupper(
            (string)Str::of(
                (new ReflectionClass($this))
                    ->getShortName()
            )
                ->snake()
                ->remove('_exception'));
    }

    abstract public function getExtensionsContent(): array;

    /**
     * @inheritDoc
     */
    #[ArrayShape(['code' => ""])] public function extensionsContent(): array
    {
        return array_merge(
            $this->getExtensionsContent(),
            [
                'code' => $this->getErrorCode()
            ]
        );
    }
}
