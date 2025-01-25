import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query products {
        products {
            id
            name
            description
            price
        }
    }
`;

export const GET_SINGLE_PRODUCT = gql`
  query product ($id: ID!) {
    product (id: $id) {
      id
      name
      description
      price
    }
  }
`;