import { useContext, useEffect } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { Product } from '../components/Product'
import { NavLink } from 'react-router-dom'
import './cart.css'

function Cart() {
  const { AddToCard, clearCart, totalPrice, totalItems, productsIncart } = useContext(ProductContext)
  const randomId = Math.floor(Math.random() * 20)


  // useEffect(() => {
  //   localStorage.setItem('productsIncart', JSON.stringify(productsIncart));
  // }, [productsIncart])

  return (
    <div className='cartPage'>
      <section>
        <button onClick={() => AddToCard(randomId)}>add one to cart</button><br />
        <button onClick={clearCart}>clear cart</button>
        <h1>Shopping Basket</h1>
        <ul>
          {productsIncart.length > 0
            ? productsIncart.map(product => (
              <li key={product.id}>
                <Product 
                id={product.id}
                />
              </li>
            ))
            : <p>Your basket is empty.</p>
          }
        </ul>
        <div className='total'>
          <button data-role="clear">Clear Basket</button>
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