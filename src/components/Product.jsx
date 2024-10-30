import { useContext, useEffect } from 'react'
import { ProductContext } from '../contex/ProductsContext'

export function Product({ id }) {
  const { productsIncart, deleteProduct, AddToCart } = useContext(ProductContext)
  const product = productsIncart.find(product => product.id === id)

  if (!product) return null;
  console.log(product)
  return (
    <li className="product">
      <div className='image'>
        <img src={product.image} alt={product.title} />
      </div>
      <div className='description'>
        <h3>{product.title}</h3>
        <p className="info">{product.description}</p>
        <div>
          <button onClick={() => AddToCart(id, -1)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => AddToCart(id, 1)}>+</button>
        </div>
      </div>
      <div className="priceColumn">
        <p>{product.price} €</p>
        <button data-role="delete" onClick={() => deleteProduct(id)}>Delete</button>
      </div>
    </li>
  )
}
