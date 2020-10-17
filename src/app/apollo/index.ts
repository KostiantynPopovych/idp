import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const { REACT_APP_MANAGEMENT_TOKEN, REACT_APP_BASE_URL_MANAGEMENT } = process.env;

const restLink = new RestLink({
  uri: REACT_APP_BASE_URL_MANAGEMENT,
  headers: {
    'Authorization': `Bearer ${REACT_APP_MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

export default client;
