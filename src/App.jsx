import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ProductsPage from "./Pages/ProductsPage";
import DetailsPages from "./Pages/DetailsPages";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import NotFound from "./Pages/NotFound";
import './app.css'
import Layout from "./Pages/Layout";


function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<DetailsPages />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
