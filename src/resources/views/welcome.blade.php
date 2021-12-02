<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{config('app.name')}}</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>

    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body>
<!-- React root DOM -->
<div id="root"></div>
<!-- React JS -->
<script src="{{ asset('js/index.js') }}" defer></script>
</body>
</html>
