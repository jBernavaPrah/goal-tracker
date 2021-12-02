<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset=utf-8/>
    <meta name="viewport"
          content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <title>GraphQL Playground</title>

    <link rel="stylesheet" href="{{\MLL\GraphQLPlayground\DownloadAssetsCommand::cssPath()}}"/>
    <link rel="shortcut icon" href="{{\MLL\GraphQLPlayground\DownloadAssetsCommand::faviconPath()}}"/>

    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
<div id="root"></div>
<script type="text/javascript">

    // update the csrf-token on the local storage

    const token = document.querySelector('meta[name="csrf-token"]').content

    let graphqlPlaygroundStorage = JSON.parse(localStorage.getItem('graphql-playground'))
    for (let workspace in graphqlPlaygroundStorage['workspaces'] ?? {}) {
        if (!graphqlPlaygroundStorage['workspaces'].hasOwnProperty(workspace) || !workspace) continue;
        const sessions = graphqlPlaygroundStorage['workspaces'][workspace]['sessions']['sessions'] ?? {};
        for (let session in sessions) {
            if (!sessions.hasOwnProperty(session) || !sessions[session]['headers']) continue;
            try {
                const headers = JSON.parse(sessions[session]['headers']);
                headers['X-CSRF-TOKEN'] = token;
                graphqlPlaygroundStorage['workspaces'][workspace]['sessions']['sessions'][session]['headers'] = JSON.stringify(headers, null, "\t")
            } catch (e) {
                // simple pass it..
            }
        }
    }
    localStorage.setItem('graphql-playground', JSON.stringify(graphqlPlaygroundStorage))


</script>
<script src="{{\MLL\GraphQLPlayground\DownloadAssetsCommand::jsPath()}}"></script>
<script type="application/javascript">
    window.addEventListener('load', function () {
        const root = document.getElementById('root');

        const token = document.querySelector('meta[name="csrf-token"]').content

        GraphQLPlayground.init(root, {
            endpoint: "{{url(config('graphql-playground.endpoint'))}}",
            subscriptionEndpoint: "{{config('graphql-playground.subscriptionEndpoint')}}",
            settings: {
                'request.credentials': 'include',
            },
            headers: {
                'X-CSRF-TOKEN': token
            }
        })


    })
</script>

</body>
</html>
