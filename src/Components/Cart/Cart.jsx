import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import Loading from '../LoadingScreen/Loading';


export default function Cart() {

  const [cart, setCart] = useState()
  const [isLoading, setIsLoading] = useState(true)


  function getCartData() {
    axios.get('https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          "token": localStorage.getItem("token")
        }
      }
    ).then(({ data }) => {

      setCart(data.data)
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
    })
  }

  function clearCart() {
    axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          "token": localStorage.getItem("token")
        }
      }
    ).then(({ data }) => {
      setCart(data.data)
    }).catch(() => {

    })
  }

  useEffect(() => {
    getCartData();

  }, [])


  if (isLoading) {
    return <Loading />
  }

  return <>
    <section className="bg-white py-8 antialiased md:py-16">
      {cart?.products.length > 0 ? <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">

            {/* products */}
            <div className="space-y-6">

              {cart?.products.map((product, index) => {
                return <CartItem product={product} key={index} setCart={setCart} cart={cart} />
              })}

            </div>
            <button onClick={clearCart} className='text-center duration-300 text-sm font-medium mt-3 bg-red-500 px-5 py-2 hover:shadow-lg text-white rounded-full hover:bg-red-600 '>Clear All</button>

          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
              <p className="text-xl font-semibold text-gray-900 ">Order summary</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 ">{cart?.totalCartPrice} L.E</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">Savings</dt>
                    <dd className="text-base font-medium text-green-600">-0 L.E</dd>
                  </dl>

                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <dt className="text-base font-bold text-gray-900 ">Total</dt>
                  <dd className="text-base font-bold text-gray-900 ">{cart?.totalCartPrice} L.E</dd>
                </dl>
              </div>

              <Link className='cursor-pointer text-center duration-300 text-sm font-medium bg-teal-500 px-5 py-2 hover:shadow-lg text-white rounded-full hover:bg-teal-600  flex justify-center w-full' to={'/Cartozo/ShippingAddress/' + cart._id}>Proceed to Checkout</Link>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link to={'/Cartozo/products'} title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                  Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
              <form className="space-y-4">
                <div>
                  <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 "> Do you have a voucher or gift card? </label>
                  <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="" required />
                </div>
                <button type="submit" className='text-center duration-300 text-sm font-medium bg-teal-500 px-5 py-2 hover:shadow-lg text-white rounded-full hover:bg-teal-600 '>Apply Code</button>
              </form>
            </div>
          </div>
        </div>
      </div> : <>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className='' >No products in your cart</h1>
          <Link to={'/Cartozo/products'} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
            Continue Shopping
            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
            </svg>
          </Link>
        </div>
      </>}
    </section>
  </>


}
