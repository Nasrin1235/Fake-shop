import { useContext } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Outlet } from "react-router-dom";



function ProductsPage() {
  const { products } = useContext(ProductContext);


  return (
    <div>
      <h1>Products</h1>
      <Outlet />
    </div>
  );
}

export default ProductsPage;
