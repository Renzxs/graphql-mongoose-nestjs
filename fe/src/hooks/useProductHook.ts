import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, GET_SINGLE_PRODUCT, UPDATE_PRODUCT } from "../api/products.api";
import { useState } from "react";
import { toast } from "react-toastify";

const useProduct = () => {
    const { data: getProductsData, loading: getProductsLoading, error: getProductsError } = useQuery(GET_PRODUCTS);
    const [ getOneProduct ,{ data: getOneProductData, loading: getOneProductLoading, error: getOneProductError }] = useLazyQuery(GET_SINGLE_PRODUCT);
    const [createProduct] = useMutation(CREATE_PRODUCT);
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);

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
                refetchQueries: [{ query: GET_PRODUCTS }]
            });

            toast.success("Successfully Created Product");
        }
        catch(error) {
            toast.error("Something went wrong");
        }
    }

    const handleDeleteProduct = async (id: string) => {
        try {
            await deleteProduct({
                variables: { id },
                refetchQueries: [{ query: GET_PRODUCTS }]
            });

            toast.success("Successfully Deleted Product");
        }
        catch(error) {
            toast.error("Something went wrong");
        }
    }

    const handleUpdateProduct = async (id: string) => {
        try {
            await updateProduct({
                variables: {
                    id,
                    name,
                    description,
                    price: parseFloat(price)
                }
            });

            toast.success("Successfully Updated Product");
        }
        catch(error) {
            toast.error("Something went wrong");
        }
    }
      
    const handleFetchSingleData = async (id: string) => {
        try {
            await getOneProduct({
                variables: { id },
            });
        }
        catch(error) {
            toast.error("Something went wrong");
        }
    }

    return {
        getProductsData,
        getProductsLoading,
        getProductsError,
        getOneProductData,
        getOneProductLoading,
        getOneProductError,
        name,
        setName,
        description,
        setDescription,
        price,
        setPrice,
        modalVisible,
        setModalVisible,
        handleCreateProduct,
        handleDeleteProduct,
        handleUpdateProduct,
        handleFetchSingleData,
    }
}

export default useProduct;