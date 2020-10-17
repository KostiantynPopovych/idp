import React, { memo } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import HomePage from 'pages/home';
import WithHeader from "components/templates/withHeader";

const App = () => (
  <ApolloProvider client={client}>
    <WithHeader>
      <HomePage />
    </WithHeader>
  </ApolloProvider>
);

export default memo(App);
