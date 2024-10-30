import { useParams } from 'react-router-dom';
import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { ProductOfCaterory } from '../components/ProductOfCaterory'

export default function Category() {
  const { category } = useParams()
  const { categories, products } = useContext(ProductContext)
  if (category === 'all')
    return (
      <ul className='productsInCategory'>
        {products.map(
          product => <ProductOfCaterory
            key={product.id}
            id={product.id}
          />
        )}
      </ul>
    )
  else if (categories.includes(category)) {
    const productsInCategory = products.filter(
      product => product.category === category
    )
    if (productsInCategory.length > 0)
      return (
        <ul className='productsInCategory'>
          {productsInCategory.map(
            product => <ProductOfCaterory
              key={product.id}
              id={product.id}
            />
          )}
        </ul>
      )
  }
  else
    return <h1 className='notFound'>No products found!</h1>

}