import {ApolloClient, InMemoryCache, from, HttpLink} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path}) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
    errorLink,
    new HttpLink({
        uri: '/graphql', credentials: 'same-origin', headers: {
            'X-CSRF-TOKEN': document?.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
        }
    })
])

export default new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});
