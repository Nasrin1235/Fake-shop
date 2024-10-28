import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { Product } from '../components/Product'
import { NavLink } from 'react-router-dom'
import './cart.css'

function Cart() {
  const { products } = useContext(ProductContext)
  const randomId = Math.floor(Math.random() * 20)

  const [productsIncart, setProductsIncart] = useState(() => {
    const savedCart = localStorage.getItem('productsIncart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const totolItems = productsIncart.reduce((acc, product) => acc + product.quantity, 0)
  const totalPrice = productsIncart.reduce((acc, product) => acc + product.quantity * product.price, 0)

  useEffect(() => {
    localStorage.setItem('productsIncart', JSON.stringify(productsIncart));
  }, [productsIncart])

  function AddToCard(id) {
    setProductsIncart(
      preCart => {
        const existingProduct = productsIncart.find(product => product.id === id)
        if (existingProduct) {
          return preCart.map(product =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        }

        const newProduct = products.find(product => product.id === id)
        if (newProduct) {
          return [...preCart, { ...newProduct, quantity: 1 }]
        }
        return preCart
      }
    )
    console.log(productsIncart)
  }

  function clearCart() {
    setProductsIncart([])
  }

  return (
    <div className='cart'>
      <button onClick={() => AddToCard(randomId)}>add one to cart</button><br />
      <button onClick={clearCart}>clear cart</button>
      <h1>Shopping Basket</h1>
      <ul>
        {productsIncart.length > 0
          ? productsIncart.map(product => (
            <li key={product.id}>
              <Product
                title={product.title}
                imageSrc={product.image}
                info={product.description}
                price={product.price}
                qty={product.quantity}
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
          <span>{`Total ${totolItems} items: ${totalPrice} €`}</span>
          <NavLink to="/checkout">Proceed to Checkout</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Cart