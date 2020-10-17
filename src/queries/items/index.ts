import { gql } from "@apollo/client";

export interface GetItemsResponse {
  imageCollection: {
    items: Item[];
    total: number;
  }
}

const GET_ITEMS = gql`
  query {
    imageCollection(skip: 0, limit: 0) {
      items {
          id
          image
          description
          price
          name
        }
      total
    }
  }
`;

export { GET_ITEMS };