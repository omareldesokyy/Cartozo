import React, { useEffect, useState } from 'react';
import Product from './../Product/Product';
import axios from 'axios';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../LoadingScreen/Loading';

export default function RelatedProducts({ id }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    const getRelatedProducts = (id) => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/?category=${id}`)
            .then((response) => {
                setProducts(response.data.data);
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })
    };

    useEffect(() => {
        if (id) {
            getRelatedProducts(id);
        }
    }, [id]);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    
                }
            }
        ]
    };


    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='my-4'>
             <div className="slider-container mb-5">
                <Slider {...settings}>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <Product product={product} key={index} />
                        ))
                    ) : (
                        <div>No related products available</div>
                    )}
                </Slider>
            </div>

        </div>
    );
}
