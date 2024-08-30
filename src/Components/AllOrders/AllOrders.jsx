import React, { useEffect, useState } from 'react'
import Loading from '../LoadingScreen/Loading'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AllOrders() {

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

  useEffect(() => {
    getCartData();
  }, [])


  if (isLoading) {
    return <Loading />
  }


  return (

    cart.products.length > 0 ? <section class="bg-white py-8 antialiased  md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Track the delivery of order #957684673</h2>

        <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">

          <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200  lg:max-w-xl xl:max-w-2xl">

            {cart?.products.map((product, index) => {
              return <div key={index} class="space-y-4 p-6">
                <div class="flex items-center gap-6">

                  <a href="#" class="h-14 w-14 shrink-0">
                    <img class="h-full object-contain" src={product.product.imageCover} alt="imac image" />
                  </a>

                  <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline">{product.product.title}</a>
                </div>

                <div class="flex items-center justify-between gap-4">
                  <p class="text-sm font-normal text-gray-500 "><span class="font-medium text-gray-900 ">Product ID:</span>
                    {product.product.id}
                  </p>

                  <div class="flex items-center justify-end gap-4">
                    <p class="text-base font-normal text-gray-900">x{product.count}</p>

                    <p class="text-xl font-bold leading-tight text-gray-900 ">{product.price} L.E</p>
                  </div>
                </div>
              </div>
            })}


            <div class="space-y-4 bg-gray-50 p-6">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="font-normal text-gray-500 ">Original price</dt>
                  <dd class="font-medium text-gray-900 ">{cart?.totalCartPrice} L.E</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="font-normal text-gray-500">Savings</dt>
                  <dd class="text-base font-medium text-green-500"> - {Math.round(cart?.totalCartPrice * .05) + Math.round(cart?.totalCartPrice * .14)} L.E</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="font-normal text-gray-500">Store Pickup</dt>
                  <dd class="font-medium text-gray-900 ">{Math.round(cart?.totalCartPrice * .05)} L.E</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="font-normal text-gray-500">Tax</dt>
                  <dd class="font-medium text-gray-900 ">{Math.round(cart?.totalCartPrice * .14)} L.E</dd>
                </dl>
              </div>

              <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                <dt class="text-lg font-bold text-gray-900 ">Total</dt>
                <dd class="text-lg font-bold text-gray-900 ">{cart?.totalCartPrice} L.E</dd>
              </dl>
            </div>
          </div>

          <div class="mt-6 grow sm:mt-8 lg:mt-0">
            <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 ">Order history</h3>

              <ol class="relative ms-3 border-s border-gray-200">
                <li class="mb-10 ms-6">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white 0 800">
                    <svg class="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 text-base font-semibold text-gray-900 ">Estimated delivery in 24 Nov 2023</h4>
                  <p class="text-sm font-normal text-gray-500">Products delivered</p>
                </li>

                <li class="mb-10 ms-6">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white 0 800">
                    <svg class="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 text-base font-semibold text-gray-900 ">Today</h4>
                  <p class="text-sm font-normal text-gray-500">Products being delivered</p>
                </li>

                <li class="mb-10 ms-6 text-primary-700 ry-500">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white -900 800">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 font-semibold">23 Nov 2023, 15:15</h4>
                  <p class="text-sm">Products in the courier's warehouse</p>
                </li>

                <li class="mb-10 ms-6 text-primary-700 ry-500">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white -900 800">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 text-base font-semibold">22 Nov 2023, 12:27</h4>
                  <p class="text-sm">Products delivered to the courier - DHL Express</p>
                </li>

                <li class="mb-10 ms-6 text-primary-700 ry-500">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white -900 800">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>
                  </span>
                  <h4 class="mb-0.5 font-semibold">19 Nov 2023, 10:47</h4>
                  <p class="text-sm">Payment accepted - VISA Credit Card</p>
                </li>

                <li class="ms-6 text-primary-700 ry-500">
                  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white -900 800">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>
                  </span>
                  <div>
                    <h4 class="mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                    <a href="#" class="text-sm font-medium hover:underline">Order placed - Receipt #647563</a>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section> : <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px-268.8px)] gap-2">
        <h1 className='' >No Orders Found</h1>
        <Link to={'/products'} title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
          Continue Shopping
          <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
          </svg>

        </Link>
      </div>
    </>
  )
}
