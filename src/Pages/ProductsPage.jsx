import { useContext } from "react";
import { ProductContext } from "../contex/ProductsContext";

function ProductsPage() {
  const { products } = useContext(ProductContext);
  console.log(products);

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}

export default ProductsPage;
