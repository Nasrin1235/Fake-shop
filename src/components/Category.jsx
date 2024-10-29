import { useParams } from 'react-router-dom';
import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'


export default function Category() {
  const { category } = useParams()
  console.log("category=", category)
  const { categories, products } = useContext(ProductContext)
  if (category === 'all')
    return (
      <div>
        {products.map(
          product => <p key={product.id}>{product.title}</p>
        )}
      </div>
    )
  else if (categories.includes(category)) {
    const productsInCategory = products.filter(
      product => product.category === category
    )
    if (productsInCategory.length > 0)
      return (
        <div>
          {productsInCategory.map(
            product => <p key={product.id}>{product.title}</p>
          )}
        </div>
      )
  }
  else
    return <h3>No products found</h3>

}