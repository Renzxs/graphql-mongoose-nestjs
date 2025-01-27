import { Button, Card, Flex, Input, Typography, Modal, Spin } from "antd";
import { useState } from "react";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS } from "./api/products.api";
import { useMutation, useQuery } from "@apollo/client";

function App() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
        refetchQueries: [{ query: GET_PRODUCTS }],
      });
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct({
        variables: { id },
        refetchQueries: [{ query: GET_PRODUCTS }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Flex style={{width: '100%', height: '100vh'}} justify="center" align="center"><Spin/></Flex>;
  if (error) return <Typography.Text type="danger">Error loading products</Typography.Text>;

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
          {data.products.map((product: Product) => (
            <Card title={`Product ID: ${product.id}`} key={product.id} type="inner">
              <Flex justify="space-between" gap={40} align="center">
                <div>
                  <Typography.Title level={4}>{product.name}</Typography.Title>
                  <Typography.Text>{product.description}</Typography.Text>
                </div>

                <Flex vertical align="flex-end" wrap={false}>
                  <Typography.Title level={4}>${product.price}</Typography.Title>
                  <Flex gap={10}>
                    <Button type="link" onClick={() => setModalVisible(true)}>
                      Delete
                    </Button>
                    <Modal
                      title="Confirm Delete"
                      open={modalVisible}
                      onOk={() => handleDeleteProduct(product.id)}
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
