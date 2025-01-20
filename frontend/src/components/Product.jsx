import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { NavLink } from "react-router-dom";

export function Product({ id }) {
  const { productsIncart, deleteProduct, AddToCart } = useContext(ProductContext)
  const product = productsIncart.find(product => product.id === id)

  if (!product) return null;
  console.log(product)
  return (
    <li className="product">
      <div className='image'>
        <NavLink to={`/products/${id}`}>
          <img src={product.image} alt={product.title} />
        </NavLink>
      </div>
      <div className='description'>
        <h3>{product.title}</h3>
        <p className="info" id='info'>{product.description}</p>
        <div>
          <button onClick={() => AddToCart(id, -1)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => AddToCart(id, 1)}>+</button>
        </div>
      </div>
      <div className="priceColumn">
        <p id='price'>{product.price} €</p>
        <button data-role="delete" onClick={() => deleteProduct(id)}>Delete</button>
      </div>
    </li>
  )
}
