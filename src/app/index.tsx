import React, { memo } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import HomePage from 'pages/home';
import WithHeader from "components/templates/withHeader";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/idp/home" exact component={() => <WithHeader><HomePage /></WithHeader>} />
        <Redirect to="/idp/home" />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default memo(App);
