import { Button, Card, Flex, Input, Typography } from "antd";
import useProduct from "./services/products/useProduct";

function App() {
  const { name, 
          description, 
          price, 
          setName, 
          setDescription, 
          setPrice, 
          handleCreateProduct 
        } = useProduct();

  return (
      <Flex justify="center" align="center" style={{height: '100vh', width: '100%'}}>
        <Card style={{ width: '30%' }}> 
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
      </Flex>
  );
}

export default App;
