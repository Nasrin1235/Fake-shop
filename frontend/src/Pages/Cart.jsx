import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { Product } from '../components/Product'
import { NavLink } from 'react-router-dom'
import './Cart.css'

function Cart() {
  const { AddToCart, clearCart, totalPrice, totalItems, productsIncart, mode } = useContext(ProductContext)
  const randomId = Math.floor(Math.random() * 20)

  const cartPageMode = mode === 'lightMode' ? 'cartPage' : 'cartPage cartPageDark'
  return (
    <div className={cartPageMode}>
      <section>
        <button onClick={() => AddToCart(randomId)}>add one to cart</button><br />
        <h1>Shopping Basket</h1>
        <ul>
          {productsIncart.length > 0
            ? productsIncart.map(product => (
              <Product
                key={product.id}
                id = {product.id}
              />
            ))
            : <p>Your basket is empty.</p>
          }
        </ul>
        <div className='total'>
          <button data-role="clear" onClick={clearCart}>Clear Basket</button>
          <div>
            <span>{`Total ${totalItems} items: ${totalPrice} €`}</span>
            <NavLink to="/checkout">Proceed to Checkout</NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart