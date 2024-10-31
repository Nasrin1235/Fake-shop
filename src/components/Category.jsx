
import { useContext,useEffect,useState } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { ProductOfCaterory } from '../components/ProductOfCaterory'
import { useParams } from 'react-router-dom';

export default function Category() {
  const { categories, products, lowestPrice, highestPrice, calculatePriceRange } = useContext(ProductContext);

  const { category } = useParams()

  useEffect(() => {
    calculatePriceRange(category);
  }, [category]);

  console.log('lowestPrice', lowestPrice)
  console.log('hightestPrice', highestPrice)

  if (category === 'all') {
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
  }
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