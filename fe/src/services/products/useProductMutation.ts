import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../api/products.api";

export const useProductMutation = () => {
  const [createProduct, { error: createError, loading: createLoading, data: createData }] = useMutation(CREATE_PRODUCT);

  return { createProduct, createError, createLoading, createData };
};