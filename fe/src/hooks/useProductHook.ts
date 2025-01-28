import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, GET_SINGLE_PRODUCT, UPDATE_PRODUCT } from "../api/products.api";
import { useState } from "react";
import { toast } from "react-toastify";

const useProduct = () => {
    // Queries & Mutations
    const { data: getProductsData, loading: getProductsLoading, error: getProductsError } = useQuery(GET_PRODUCTS); // useQuery used for immediate or automatic data fetching
    const [ getOneProduct ,{ data: getOneProductData, loading: getOneProductLoading, error: getOneProductError }] = useLazyQuery(GET_SINGLE_PRODUCT); // useLazyQuery used for manual fetching, where you need to manually call it to work, works like useMutation
    const [createProduct] = useMutation(CREATE_PRODUCT);
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    // Input
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    // Modal State
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

    // Functions
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
            setName('');
            setDescription('');
            setPrice('');
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
                    updateProductDto: {
                        id,
                        name,
                        description,
                        price: parseFloat(price)
                    }
                }
            });

            toast.success("Successfully Updated Product");
            setName('');
            setDescription('');
            setPrice('');
            setEditModalVisible(false);
        }
        catch(error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
      
    const handleFetchSingleData = async (id: string) => {
        try {
            const { data } = await getOneProduct({
                variables: { id },
            });
            
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setEditModalVisible(true);
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
        deleteModalVisible,
        setDeleteModalVisible,
        editModalVisible,
        setEditModalVisible,
        handleCreateProduct,
        handleDeleteProduct,
        handleUpdateProduct,
        handleFetchSingleData,
    }
}

export default useProduct;