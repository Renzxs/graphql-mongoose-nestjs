import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, GET_SINGLE_PRODUCT, UPDATE_PRODUCT } from "../api/products.api";
import { useState } from "react";

const useProduct = () => {
  const { loading: productsLoading, error: productsError, data: productsData, refetch: productsRefetch } = useQuery(GET_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [getSingleProduct, { loading: singleProductLoading, data: singleProductData, error: singleProductError }] = useLazyQuery(GET_SINGLE_PRODUCT);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleCreateProduct = async () => {
    try {
      if (!name || !description || !price) {
        toast.error("Missing required fields");
        return;
      }

      await createProduct({
        variables: {
          createProductDto: {
            name,
            description,
            price: parseFloat(price),
          },
        },
      });

      setName("");
      setDescription("");
      setPrice("");
      await productsRefetch();
      toast.success("Product Created");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteProduct = async (product_id: string) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await deleteProduct({ variables: { id: product_id } });

          await productsRefetch();
          toast.error("Product Deleted");
        } else {
          swal("Your product is safe!");
        }
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateProduct = async (product_id: string) => {
    try {
      if (!name || !description || !price) {
        toast.error("Missing required fields");
        return;
      }

      await updateProduct({
        variables: {
          updateProductDto: {
            id: product_id,
            name,
            description,
            price: parseFloat(price),
          },
        },
      });

      setName("");
      setDescription("");
      setPrice("");
      await productsRefetch();
      toast.success("Product Updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchSingleProduct = async (product_id: string) => {
    try {
      const result = await getSingleProduct({ variables: { id: product_id } });
      return result.data;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return {
    handleCreateProduct,
    handleDeleteProduct,
    handleUpdateProduct,
    fetchSingleProduct,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    productsData,
    productsLoading,
    productsError,
    singleProductLoading,
    singleProductData,
    singleProductError,
  };
};

export default useProduct;
