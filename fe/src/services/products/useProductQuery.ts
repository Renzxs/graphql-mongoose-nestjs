import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_SINGLE_PRODUCT } from "../../api/products.api";

export const useProductQuery = (id?: string) => {
  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_PRODUCTS);

  const {
    loading: singleProductLoading,
    error: singleProductError,
    data: singleProductData,
  } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id: id },
  });

  return {
    productsLoading,
    productsError,
    productsData,
    singleProductLoading,
    singleProductError,
    singleProductData,
  };
};
