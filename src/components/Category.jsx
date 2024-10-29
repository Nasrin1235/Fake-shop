import { useParams } from 'react-router-dom';
import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import {ProductOfCaterory} from '../components/ProductOfCaterory'

export default function Category() {
  const { category } = useParams()
  console.log("category=", category)
  const { categories, products } = useContext(ProductContext)
  if (category === 'all')
    return (
      <ul>
        {products.map(
          product => <ProductOfCaterory key={product.id}/>
        )}
      </ul>
    )
  else if (categories.includes(category)) {
    const productsInCategory = products.filter(
      product => product.category === category
    )
    if (productsInCategory.length > 0)
      return (
        <ul>
          {productsInCategory.map(
            product => <ProductOfCaterory key={product.id}/>
          )}
        </ul>
      )
  }
  else
    return <h3>No products found</h3>

}