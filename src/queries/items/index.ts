import { gql, ApolloCache } from "@apollo/client";

const { REACT_APP_BASE_PATH } = process.env;

export interface GetItemsResponse {
  items: {
    items: ItemWrap[]
  };
  total: number;
}

const GET_ITEMS = gql`
  query {
    items @rest(type: "Items", path: "${REACT_APP_BASE_PATH}") {
      items {
        fields {
          name
          description
          image
        }
        sys {
          id
          version
        }
      }
      total
    }
  }
`;

const ADD_ITEM = gql`
  mutation addItem($input: newItem!) {
    addItem(input: $newItem)
      @rest(type: "Items", path: "${REACT_APP_BASE_PATH}", method: "POST") {
      id
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($input: itemId!) {
    deleteItem(input: $itemId)
      @rest(type: "Items", path: "${REACT_APP_BASE_PATH}/{args.input}", method: "DELETE") {
      id
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem($input: updatedItem!, $input: config!) {
    updateItem(input: $updatedItem, config: $config)
      @rest(type: "Items", path: "${REACT_APP_BASE_PATH}/{args.config.id}", method: "PUT") {
      id
    }
  }
`;

const updateItemsList = (cache: ApolloCache<unknown>) => {
  cache.writeQuery({
    query: GET_ITEMS,
    data: {
      items: {
        __typename: 'Users'
      }
    }
  })
};

export { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, updateItemsList };