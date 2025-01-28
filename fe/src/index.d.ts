interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
}

interface ProductCardProps {
    product: Product, 
    handleFetchSingleData: (id: string) => void, 
    setDeleteModalVisible: (value: boolean) => void
}