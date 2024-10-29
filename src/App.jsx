import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ProductsPage from "./Pages/ProductsPage";
import DetailsPages from "./Pages/DetailsPages";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import NotFound from "./Pages/NotFound";
import { useContext } from "react";
import { ProductContext } from "./contex/ProductsContext";
import "./app.css";
import Layout from "./Pages/Layout";

function App() {
  const { mode, modeSwitch } = useContext(ProductContext);
  const modeClass = mode === "lightMode" ? "app" : "app dark";

  return (
    <div className={modeClass}>
      <button onClick={modeSwitch} data-role="mode">
        {mode}
      </button>
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
    </div>
  );
}

export default App;
