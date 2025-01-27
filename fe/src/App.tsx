import { Button, Card, Flex, Input, Typography } from "antd";
import useProduct from "./services/useProduct";
import { Edit, Eye, Trash } from "lucide-react";
import { useEffect } from "react";

function App() {
  const { name, 
          description, 
          price, 
          setName, 
          setDescription, 
          setPrice, 
          handleCreateProduct,
          productsData,
          handleDeleteProduct,
          fetchSingleProduct
        } = useProduct();

        useEffect(() => {
          const fetch = async () => {
            const data = await fetchSingleProduct("67972f990b6a138fef41fe71");
            console.log(data);
          };
      
          fetch();
  }, []);

  return (
      <Flex justify="center" align="start" style={{height: '90vh', width: '100%', gap: 20}}>
        <Card style={{ flex: 1 }} type="inner"> 
              <Flex gap={10} vertical>
                <Flex vertical style={{marginBottom: '20px'}}>
                  <Typography.Title level={3}>Create a product</Typography.Title>
                  <Typography.Text>Please fill all of the inputs.</Typography.Text>
                </Flex>

                <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text"
                    required
                    placeholder="Enter product name"/>

                <Input.TextArea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                    placeholder="Description"/>
                  
                <Input 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      type="number"
                      required
                      placeholder="Enter product price"/>

                <Button onClick={handleCreateProduct} type="primary">Create Product</Button>
              </Flex>
        </Card>
        
        <Card title="Product List" style={{ height: '90vh', flex: 1.5, overflow: 'auto' }} type="inner">
          <Flex vertical gap={10}>
          {
              productsData?.products?.map((product: Product) => (
                <Card title={`Product ID: ${product.id}`} key={product.id} type="inner"> 
                  <Flex justify="space-between" align="center">
                    <div>
                      <Typography.Title level={4}>{product.name}</Typography.Title>
                      <Typography.Text>{product.description}</Typography.Text>
                    </div>

                    <Flex vertical align="flex-end">
                      <Typography.Title level={4}>${product.price}</Typography.Title>
                      <Flex gap={10}>
                        <Eye  style={{ cursor: 'pointer' }}/>
                        <Edit  style={{ cursor: 'pointer' }}/>
                        <Trash onClick={() => handleDeleteProduct(product.id)} style={{ cursor: 'pointer' }}/>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              ))
            }
          </Flex>
        </Card>
      </Flex>
  );
}

export default App;
