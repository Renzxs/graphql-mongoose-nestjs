import { Button, Card, Flex, Input, Typography, Modal, Spin } from "antd";
import useProduct from "./hooks/useProductHook";
import ProductCard from "./components/ProductCard";

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
    deleteModalVisible,
    setDeleteModalVisible,
    editModalVisible,
    setEditModalVisible,
    handleCreateProduct,
    handleDeleteProduct,
    handleUpdateProduct,
    handleFetchSingleData
  } = useProduct();

  if (getProductsLoading) return <Flex style={{width: '100%', height: '100vh'}} justify="center" align="center"><Spin/></Flex>;
  if (getProductsError) return <Typography.Text type="danger">Error loading products</Typography.Text>;

  return (
    <Flex justify="center" align="start" style={{ height: "90vh", width: "100%", gap: 20 }}>
      {/* Create Product Modal */}
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

      {/* Product List */}
      <Card title="Product List" style={{ flex: 1.5, overflow: "auto" }} type="inner">
        <Flex vertical gap={10}>
          {getProductsData.products.map((product: Product) => (
            <>
              {/* Product Card */}
              <ProductCard 
                product={product} 
                handleFetchSingleData={handleFetchSingleData} 
                setDeleteModalVisible={setDeleteModalVisible}/>

              {/* Delete Modal */}
              <Modal
                title="Confirm Delete"
                open={deleteModalVisible}
                onOk={() => handleDeleteProduct(product.id || '')}
                onCancel={() => setDeleteModalVisible(false)}>  
                <Typography.Text>Are you sure you want to delete this product?</Typography.Text>
              </Modal>
              
              {/* Edit Product */}
              <Modal
                title="Edit Product"
                open={editModalVisible}
                onOk={() => handleUpdateProduct(product.id || '')}
                onCancel={() => setEditModalVisible(false)}> 
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
              </Modal>
            </>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
}

export default App;
