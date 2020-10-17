import { ApolloClient, InMemoryCache } from '@apollo/client';

const { REACT_APP_DELIVERY_TOKEN, REACT_APP_BASE_URL } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    'Authorization': `Bearer ${REACT_APP_DELIVERY_TOKEN}`,
  },
});

export default client;
