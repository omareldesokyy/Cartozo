import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CartItem({ product, setCart, cart }) {
    const [decrementBTN, setDecrementBTN] = useState(false)
    const [productCounter, setProductCounter] = useState(product?.count)
    const [increaseLoad, setIncreaseLoad] = useState(false);
    const [decreaseLoad, setDecreaseLoad] = useState(false);

    async function deleteProductFromCart(id) {
        await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + id,
            {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }
        ).then(({ data }) => {
            setCart(data.data)
        })
    }

    function setProductCount(id, count) {
        axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + id,
            {
                count
            },
            {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }
        ).then(({ data }) => {
            setCart(data.data)
            setIncreaseLoad(false);
            setDecreaseLoad(false);
        })
    }

    useEffect(() => {
        setProductCounter(product?.count)
        if (product.count == 1) {
            setDecrementBTN(true)
        }
    }, [cart])

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm  md:p-6">

            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href="#" className="shrink-0 md:order-1">
                    <img className="w-32" src={product?.product.imageCover} alt="imac image" />
                </a>

                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                        <button disabled={decrementBTN || decreaseLoad} onClick={() => { setDecreaseLoad(true); setProductCount(product?.product._id, Number(product?.count) - 1) }}

                            type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="disabled:cursor-not-allowed inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                            {decreaseLoad ? <i class="fa-solid fa-spinner fa-spin"></i> : <svg className="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                            }


                        </button>

                        <input onBlur={() => setProductCount(product?.product._id, productCounter)} onChange={(e) => { setProductCounter(e.target.value) }} type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 " placeholder="" value={productCounter} required />

                        <button onClick={() => {
                            setIncreaseLoad(true);
                            setProductCount(product?.product._id, Number(product?.count) + 1); setDecrementBTN(false);
                        }} type="button" disabled={increaseLoad} id="increment-button" data-input-counter-increment="counter-input" className="disabled:cursor-not-allowed inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                            {increaseLoad ? <i class="fa-solid fa-spinner fa-spin"></i> : <svg className=" h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>}

                        </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 "> {product?.price} L.E</p>
                    </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href="#" className="text-base font-medium text-gray-900 hover:underline ">{product?.product.title}</a>

                    <div className="flex items-center gap-4">
                        <button onClick={() => {
                            deleteProductFromCart(product.product._id)
                        }} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline">
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>

                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
