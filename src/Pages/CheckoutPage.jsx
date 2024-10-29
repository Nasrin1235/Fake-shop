import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Product } from "../components/Product";
import { NavLink } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { productsIncart, clearCart } = useContext(ProductContext);

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    shippingMethod: "Standard",
    paymentMethod: "Credit Card",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [orderMessage, setOrderMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    return productsIncart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetails = {
      ...formData,
      items: productsIncart,
      total: calculateTotal(),
    };

    console.log("Order Details:", orderDetails);

    clearCart();
    setFormData(initialFormData);
    setOrderMessage("Your order has been successfully created!");
  };
  useEffect(() => {
    if (orderMessage) {
      const timer = setTimeout(() => {
        setOrderMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [orderMessage]);

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        <label>Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Your Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Telephone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label>Shipping Address</label>
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div className="flex-row">
          <input
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-row">
          <input
            name="postalCode"
            type="text"
            placeholder="ZIP"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="shipping-methods">
          <h3>Shipping Methods</h3>
          <label>
            <input
              type="radio"
              name="shippingMethod"
              value="Standard"
              checked={formData.shippingMethod === "Standard"}
              onChange={handleChange}
            />
            <img
              src="https://www.dhlexpress.nl/sites/default/files/styles/grid_image_1x/public/content/images/dhl-group-logo_0.png?itok=855ycHN5"
              alt="Standard"
            />
          </label>
          <label>
            <input
              type="radio"
              name="shippingMethod"
              value="Express"
              checked={formData.shippingMethod === "Express"}
              onChange={handleChange}
            />
            <img
              src="https://www.designtagebuch.de/wp-content/uploads/mediathek//2008/10/hermes-versand-logo.png"
              alt="Express"
            />
          </label>
        </div>

        <div className="payment-methods">
          <h3>Payment Methods</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Credit Card"
              checked={formData.paymentMethod === "Credit Card"}
              onChange={handleChange}
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuk49AFe0NOLPetBKCBD9DQGuZLt1ZO_81i4UhvohhCIqNTVjNaT6bqUf58dWjkoezJII&usqp=CAU"
              alt="Credit Card"
            />
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={formData.paymentMethod === "PayPal"}
              onChange={handleChange}
            />
            <img
              src="https://e7.pngegg.com/pngimages/217/566/png-clipart-paypal-paypal.png"
              alt="PayPal"
            />
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Bank Transfer"
              checked={formData.paymentMethod === "Bank Transfer"}
              onChange={handleChange}
            />
            <img
              src="https://www.currensea.com/hs-fs/hubfs/Apple_Pay_logo_blk_020519-ai.png"
              alt="Bank Transfer"
            />
          </label>
        </div>

        <button type="submit" className="place-order">
          Place Order
        </button>
      </form>

      {orderMessage && <div className="order-message">{orderMessage}</div>}
      <div className="cart-summary">
        <section>
          <h3>Your Cart</h3>
          <ul className="checkout-product-list">
            {productsIncart.length > 0 ? (
              productsIncart.map((product) => (
                <li key={product.id}>
                  <Product id={product.id} />
                </li>
              ))
            ) : (
              <p>Your basket is empty.</p>
            )}
          </ul>
          <p>Total: €{calculateTotal()}</p>
          <button className="continue-shopping">
            <NavLink to="/products">Continue Shopping</NavLink>
          </button>
        </section>
      </div>
    </div>
  );
}

export default CheckoutPage;
