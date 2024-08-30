import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../LoadingScreen/Loading';

export default function ProductsByBrand() {

  const { id } = useParams()
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  function getProductsByBrand(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      .then((response) => {
        setProducts(response.data.data);
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getProductsByBrand(id)
  }, [])


  if (isLoading) {
    return <Loading />
  }

  return (


    products.length > 0 ?
      <div className='w-full px-8 py-4 m-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product, index) => { return <Product key={index} product={product} index={index} /> })}
      </div>
      :
      <div className='flex justify-center w-full pt-10'>
        <h3 className='mx-auto text-2xl text-teal-500 mb-5 tracking-tight font-semibold leading-8'>No products in this brand</h3>
      </div>

  )
}
