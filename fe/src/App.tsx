import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_PRODUCTS, GET_SINGLE_PRODUCT } from "./api/products.api";

function App() {
  const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id: "67934ed44144a26583e10071" },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;
