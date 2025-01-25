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
  query product($id: String!) {
    product(id: $id) {
      id
      name
      description
      price
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($createProductDto: CreateProductDto!) {
    createProduct(createProductDto: $createProductDto) {
      id
      name
      price
    }
  }
`;
