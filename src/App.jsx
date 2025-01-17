import { Route, Routes, Navigate} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ProductsPage from "./Pages/ProductsPage";
import DetailsPages from "./Pages/DetailsPages";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import NotFound from "./Pages/NotFound";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/LoginPage";
import './app.css'
import Layout from "./Pages/Layout";
import Category from "./components/Category";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />}>
          <Route index element={<Navigate to="category/all" replace />} />
          <Route path="category/:category" element={<Category />} />
        </Route>
        <Route path="/products/:id" element={<DetailsPages />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
