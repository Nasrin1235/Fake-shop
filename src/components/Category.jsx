
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { ProductOfCaterory } from '../components/ProductOfCaterory'
import { useParams } from 'react-router-dom';

export default function Category() {
  const { categories, products, calculatePriceRange, lowestPrice, highestPrice } = useContext(ProductContext);

  const { category } = useParams()
  let filteredProducts

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      calculatePriceRange(category);
    }
  }, [category, products, categories]);

  console.log("lowestPrice", lowestPrice)
  console.log("highestPrice", highestPrice)

  if (category === 'all') {
    filteredProducts = products.filter(product => product.price >= lowestPrice && product.price <= highestPrice);
    if (filteredProducts.length > 0)
      return (
        <ul className='productsInCategory'>
          {filteredProducts.map(
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
    filteredProducts = productsInCategory.filter(product => product.price >= lowestPrice && product.price <= highestPrice);

    if (filteredProducts.length > 0)
      return (
        <ul className='productsInCategory'>
          {filteredProducts.map(
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