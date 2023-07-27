import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import GetPokemons from "./components/GetPokemons.tsx";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(
      "GraphQL Errors",
      graphQLErrors.map(({ message }) => {
        return alert(`GraphQL error ${message}`);
      })
    );
  }
  if (networkError) {
    console.log("Network Errors", networkError);
  }
});

const link = new HttpLink({
  uri: "https://graphql-pokeapi.graphcdn.app/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, link]),
});

console.log(client);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <ApolloProvider client={client}>
      <App />
      <GetPokemons />
    </ApolloProvider>
  </div>
);
