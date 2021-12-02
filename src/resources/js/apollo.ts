import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
});

const csrfToken = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = document?.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            'X-CSRF-TOKEN': token ?? "",
        }
    }
});

export default new ApolloClient({
    link: csrfToken.concat(link),
    cache: new InMemoryCache()
});
