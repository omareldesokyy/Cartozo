import React, { useEffect, useState } from 'react'
import RatingStars from '../RatingStars/RatingStars'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import useAddToCart from '../../Hooks/useAddToCart';
import { Bounce, toast } from 'react-toastify';
import useAddToFavorites from '../../Hooks/useAddToFavorites';



export default function Product({ product }) {

    const navigate = useNavigate();
    const { wishItems, setWishItems, addToFavorites } = useAddToFavorites();
    

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };


    function goToProductDetails() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products/').then(() => {
            navigate('/ProductDetails/' + product.id)
        })


    }

    function getUserWishList() {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }
        ).then(({ data }) => {
            setWishItems(data.data.map((product) => {
                return product._id
            }))
        })
    }

    function removeFromWishlist(id) {
        axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id,
            {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }
        ).then(({ data }) => {
            setWishItems(data.data.map((product) => {
                return product._id
            }))
        }).then(() => {

            toast(product?.title + ' Removed From Wishlist ✨', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }).catch(() => {
            toast.error('Failed To remove ' + product?.title + ' From Wishlist', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        });
    }


    useEffect(() => {
        getUserWishList();
    }, [])



    return (
        <div className='px-3'>
            <div className="max-w-md w-full shadow-lg rounded-xl p-4 border">

                <div className="relative h-48 w-full mb-3">
                    {/* wish icon */}
                    <div className="absolute flex flex-col top-0 right-0 p-3 z-10">
                        <button onClick={() => { wishItems.includes(product?.id) ? removeFromWishlist(product.id) : addToFavorites(product.id, product) }} className="transition ease-in duration-300 bg-gray-800  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={wishItems.includes(product?.id) ? '#14b8a6' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>

                    </div>

                    {/* img */}
                    <Slider {...settings}>
                        <img src={product.imageCover} alt={product.title + "image"} className="  h-48 object-contain rounded-2xl" />
                        {product?.images.map((img, index) => {
                            return <img  src={img} key={index} alt={product.title + "image"} className="  h-48 object-contain rounded-2xl" />
                        })}

                    </Slider>

                </div>

                <div onClick={() => {
                    goToProductDetails()
                }} className="flex items-center w-full justify-between min-w-0 ">
                    <img src={product.brand.image} style={{ width: "80px" }} alt={product.brand.name + " Logo"} />

                    {product.quantity > 0 ?
                        <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                            INSTOCK
                        </div>
                        :
                        <div className="flex items-center bg-purple-500 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                            OUTOFSTOCK
                        </div>
                    }

                </div>

                <h2 onClick={() => {
                    goToProductDetails()
                }} className="text-lg mr-auto cursor-pointer hover:text-purple-500 line-clamp-1">{product.title}</h2>

                <div className="flex-auto justify-evenly">

                    <div onClick={() => {
                    goToProductDetails()
                }} className="w-full mt-3 flex items-center justify-between my text-gray-600">
                        <RatingStars number={product.ratingsAverage} ratingCount={product.ratingsQuantity} />
                    </div>

                    <div className="w-full mt-3 flex items-center justify-between my text-gray-600">
                        <div onClick={() => {
                    goToProductDetails()
                }}  className="text-xl font-semibold mt-1">{product.price} L.E</div>

                        <button onClick={() => { useAddToCart(product?.id, product) }} className="mt-3 transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-teal-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-teal-600 ">
                            <img className='h-7' src="/imgs/add-to-the-cart.svg" alt="add to cart icon" />
                        </button>

                    </div>
                </div>

            </div>
        </div>


    )
}
