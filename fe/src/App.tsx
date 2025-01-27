import { Button, Card, Flex, Input, Typography, Modal, Spin } from "antd";
import useProduct from "./hooks/useProductHook";

function App() {
  const {
    getProductsData,
    getProductsLoading,
    getProductsError,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    modalVisible,
    setModalVisible,
    handleCreateProduct,
    handleDeleteProduct
  } = useProduct();

  if (getProductsLoading) return <Flex style={{width: '100%', height: '100vh'}} justify="center" align="center"><Spin/></Flex>;
  if (getProductsError) return <Typography.Text type="danger">Error loading products</Typography.Text>;

  return (
    <Flex justify="center" align="start" style={{ height: "90vh", width: "100%", gap: 20 }}>
      <Card style={{ flex: 1 }} type="inner">
        <Flex gap={10} vertical>
          <Flex vertical style={{ marginBottom: "20px" }}>
            <Typography.Title level={3}>Create a product</Typography.Title>
            <Typography.Text>Please fill all of the inputs.</Typography.Text>
          </Flex>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Description"
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter product price"
          />
          <Button onClick={handleCreateProduct} type="primary">
            Create Product
          </Button>
        </Flex>
      </Card>

      <Card title="Product List" style={{ flex: 1.5, overflow: "auto" }} type="inner">
        <Flex vertical gap={10}>
          {getProductsData.products.map((product: Product) => (
            <Card title={`Product ID: ${product.id}`} key={product.id} type="inner">
              <Flex justify="space-between" gap={40} align="center">
                <div>
                  <Typography.Title level={4}>{product.name}</Typography.Title>
                  <Typography.Text>{product.description}</Typography.Text>
                </div>

                <Flex vertical align="flex-end">
                  <Typography.Title level={4} style={{ textWrap: 'nowrap'}}>${product.price}</Typography.Title>
                  <Flex gap={10}>
                  <Button type="primary"  onClick={() => setModalVisible(true)}>
                      Edit
                    </Button>
                    <Button type="primary"  onClick={() => setModalVisible(true)}>
                      Delete
                    </Button>
                    <Modal
                      title="Confirm Delete"
                      open={modalVisible}
                      onOk={() => handleDeleteProduct(product.id || '')}
                      onCancel={() => setModalVisible(false)}
                    >
                      <Typography.Text>Are you sure you want to delete this product?</Typography.Text>
                    </Modal>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
}

export default App;
