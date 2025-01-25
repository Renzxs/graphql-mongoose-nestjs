import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PRODUCTS, GET_SINGLE_PRODUCT, CREATE_PRODUCT} from "./api/products.api";

function App() {
  const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id: "67934ed44144a26583e10072" },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  useEffect(() => {
    console.log(data);
  }, [data]);

  // const [ createProduct, { data, loading, error } ] = useMutation(CREATE_PRODUCT);
  // const [name, setName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [price, setPrice] = useState<string>("");

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try { 
  //     await createProduct({
  //       variables: {
  //         createProductDto: {
  //           name,
  //           description,
  //           price: parseFloat(price), // Ensure price is a number
  //         },
  //       },
  //     });
  //   } catch (err) {
  //     console.error("Error creating product:", err);
  //   }
  // }

  return (
    <div>
      {/* <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <button type="submit">Create Product</button>
      </form>

      {data && (
        <div>
          <h2>Product Created:</h2>
          <p>ID: {data.createProduct.id}</p>
          <p>Name: {data.createProduct.name}</p>
          <p>Price: {data.createProduct.price}</p>
        </div>
      )} */}
    </div>
  );
}

export default App;
