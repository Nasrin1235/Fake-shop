import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { NavLink } from "react-router-dom";

export function ProductOfCaterory({ id }) {
  const { products } = useContext(ProductContext)
  const product = products.find(product => product.id === id)
  return (
    <li>
      <NavLink to={`/products/${id}`}>
        <div>
          <img src={product.image} alt={product.title} />
        </div>
        <p className='productTitle'>{product.title}</p>
        <p className='productPrice'>{product.price} €</p>
      </NavLink>
    </li>
  )
}