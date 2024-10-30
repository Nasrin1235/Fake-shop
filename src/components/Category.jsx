
import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { ProductOfCaterory } from '../components/ProductOfCaterory'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Category() {
  const { categories, products} = useContext(ProductContext)

  const { category } = useParams()
  const [lowestPrice, setLowestPrice] = useState(null)
  const [hightestPrice, sethightestPrice] = useState(null)

  useEffect(() => {
    if (category === 'all') {
      const allPrices = products.map(product => product.price)
      setLowestPrice(Math.min(...allPrices))
      sethightestPrice(Math.max(...allPrices))
    } else if (categories.includes(category)) {
      const productsInCategory = products.filter(
        product => product.category === category
      )
      const allPrices = productsInCategory.map(product => product.price)
      setLowestPrice(Math.min(...allPrices))
      sethightestPrice(Math.max(...allPrices))
    }
  }, [category])

  console.log('lowestPrice', lowestPrice)
  console.log('hightestPrice', hightestPrice)

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