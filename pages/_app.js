import React from "react";
import { Container } from "next/app";
import { ApploClient, ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import fetch from "isomorphic-fetch";
import { ApolloProvider } from "react-apollo";

const IS_BROWSER = !!process.browser;

if (!IS_BROWSER) {
  global.fetch = fetch;
}

const URI_ENDPOINT = "http://localhost:3000/graphql";

function createClient(initialState) {
  return new ApolloClient({
    connectToDevTools: IS_BROWSER,
    ssrMode: !IS_BROWSER,
    link: new HttpLink({
      uri: URI_ENDPOINT,
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

const client = createClient();

export default props => {
  const { Component, pageProps, ApolloClient } = props;
  return (
    <Container>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  );
};