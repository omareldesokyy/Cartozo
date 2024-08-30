import React from 'react';
import RatingStars from '../RatingStars/RatingStars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import useAddToCart from '../../Hooks/useAddToCart';
import { Bounce, toast } from 'react-toastify';

export default function WishlistProduct({ product, onRemove }) {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    function goToProductDetails() {
        navigate('/ProductDetails/' + product.id);
    }

    function removeFromWishlist(id) {
        axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(() => {
            onRemove(id); // Call the callback to update the state in the parent component
            toast.success(product?.title + ' Removed From Wishlist ✨', {
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
                transition: Bounce,
            });
        });
    }

    if (!product) {
        return <h1>loading</h1>;
    }

    return (
        <div className='px-3 py-3'>
            <div className="max-w-md w-full shadow-lg rounded-xl p-4 border">
                <div className="relative w-full mb-3">
                    <div className="absolute flex flex-col top-0 right-0 p-3 z-10">
                        <button onClick={() => removeFromWishlist(product.id)} className="transition ease-in duration-300 hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                            <svg fill="#de5454" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 473 473" xmlSpace="preserve" stroke="#de5454">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path d="M324.285,215.015V128h20V38h-98.384V0H132.669v38H34.285v90h20v305h161.523c23.578,24.635,56.766,40,93.477,40 c71.368,0,129.43-58.062,129.43-129.43C438.715,277.276,388.612,222.474,324.285,215.015z M294.285,215.015 c-18.052,2.093-34.982,7.911-50,16.669V128h50V215.015z M162.669,30h53.232v8h-53.232V30z M64.285,68h250v30h-250V68z M84.285,128 h50v275h-50V128z M164.285,403V128h50v127.768c-21.356,23.089-34.429,53.946-34.429,87.802c0,21.411,5.231,41.622,14.475,59.43 H164.285z M309.285,443c-54.826,0-99.429-44.604-99.429-99.43s44.604-99.429,99.429-99.429s99.43,44.604,99.43,99.429 S364.111,443,309.285,443z" />
                                        <polygon points="342.248,289.395 309.285,322.358 276.323,289.395 255.11,310.608 288.073,343.571 255.11,376.533 276.323,397.746 309.285,364.783 342.248,397.746 363.461,376.533 330.498,343.571 363.461,310.608 " />
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>

                    {/* img */}
                    <Slider {...settings} className='h-48'>
                        <img src={product?.imageCover} alt={product?.title + " image"} className="h-48 object-contain rounded-2xl" />
                        {product?.images?.map((img, index) => (
                            <img src={'https://ecommerce.routemisr.com/Route-Academy-products/' + img} key={index} alt={product.title + " image"} className="h-48 object-contain rounded-2xl" />
                        ))}
                    </Slider>
                </div>

                <div className="flex items-center w-full justify-between min-w-0">
                    <img src={product?.brand?.image} style={{ width: "80px" }} alt={product?.brand?.name + " Logo"} />

                    {product?.quantity > 0 ?
                        <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                            INSTOCK
                        </div>
                        :
                        <div className="flex items-center bg-purple-500 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                            OUTOFSTOCK
                        </div>
                    }
                </div>

                <h2 onClick={goToProductDetails} className="text-lg mr-auto cursor-pointer hover:text-purple-500 line-clamp-1">{product?.title}</h2>

                <div className="flex-auto justify-evenly">
                    <div className="w-full mt-3 flex items-center justify-between my text-gray-600">
                        <RatingStars number={product?.ratingsAverage} ratingCount={product?.ratingsQuantity} />
                    </div>

                    <div className="w-full mt-3 flex items-center justify-between my text-gray-600">
                        <div className="text-xl font-semibold mt-1">{product?.price} L.E</div>
                        <button onClick={() => useAddToCart(product?.id, product)} className="mt-3 transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-teal-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-teal-600">
                            <img className='h-7' src="./imgs/add-to-the-cart.svg" alt="add to cart icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
