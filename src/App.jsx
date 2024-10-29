import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ProductsPage from "./Pages/ProductsPage";
import DetailsPages from "./Pages/DetailsPages";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import NotFound from "./Pages/NotFound";
import { ProductsProvider } from "./contex/ProductsContext";
import Layout from "./Pages/Layout";


function App() {
  return (
    <ProductsProvider>
      <Layout >
    <Routes>
      <Route path="/" element={< Homepage/>} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<DetailsPages />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Layout>
    </ProductsProvider>
  );
}

export default App;
