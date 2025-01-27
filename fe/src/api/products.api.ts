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
      description
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($updateProductDto: UpdateProductDto!) {
    updateProduct(updateProductDto: $updateProductDto) {
      id
      name
      description
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;