import { useState } from "react";
import { toast } from "react-toastify";
import { useProductQuery } from "./useProductQuery";
import { useProductMutation } from "./useProductMutation";

const useProduct = () => {
  const { productsData, productsError, productsLoading, singleProductData } = useProductQuery();
  const { createProduct, createError, createLoading } = useProductMutation();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleCreateProduct = async () => {
    try {
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
      toast.success("Product Created");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return {
    handleCreateProduct,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    productsData,
    productsLoading,
    productsError,
    singleProductData,
    createLoading,
    createError,
  };
};

export default useProduct;
