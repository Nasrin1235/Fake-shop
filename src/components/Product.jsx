import { useContext, useEffect } from 'react'
import { ProductContext } from '../contex/ProductsContext'

export function Product({ id }) {
  const { products } = useContext(ProductContext)
  const product = products.find(product => product.id === id)
  function deleteItem() {
  }
  if (!product) return null;
  console.log(product)
  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <div>
        <h3>{product.title}</h3>
        <p className="info">{product.description}</p>
        <div>
          <button>-</button>
          <span>{product.quantity}</span>
          <button>+</button>
        </div>
      </div>
      <div className="priceColumn">
        <p>{product.price} €</p>
        <button data-role="delete" onClick={() => deleteItem(id)}>Delete</button>
      </div>
    </div>
  )
}
