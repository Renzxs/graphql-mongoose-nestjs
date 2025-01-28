import { Button, Card, Flex, Typography } from "antd";

const ProductCard = ({ product, handleFetchSingleData, setDeleteModalVisible }: ProductCardProps ) => {
    
    return (
        <Card title={`Product ID: ${product.id}`} key={product.id} type="inner">
            <Flex justify="space-between" gap={40} align="center">
                <div>
                  <Typography.Title level={4}>{product.name}</Typography.Title>
                  <Typography.Text>{product.description}</Typography.Text>
                </div>

                <Flex vertical align="flex-end">
                    <Typography.Title level={4} style={{ textWrap: 'nowrap'}}>${product.price}</Typography.Title>
                    <Flex gap={10}>
                        <Button type="primary"  onClick={() => handleFetchSingleData(product.id || '')}>
                            Edit
                        </Button>

                        <Button type="primary"  onClick={() => setDeleteModalVisible(true)}>
                            Delete
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}

export default ProductCard;