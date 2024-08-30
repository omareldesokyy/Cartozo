import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WishlistProduct from '../WishlistProduct/WishlistProduct';
import Loading from '../LoadingScreen/Loading';

export default function Wishlist() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function getUserWishList() {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setProducts(data.data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getUserWishList();
    }, []);

    const handleRemoveProduct = (id) => {
        // Filter out the removed product
        setProducts(products.filter(product => product.id !== id));
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="mx-auto container py-12 flex justify-center items-center px-6">
            <div className="flex flex-col justify-start items-start">
                <div className="mt-3">
                    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9">Favourites</h1>
                </div>
                <div className="mt-4">
                    <p className="text-2xl tracking-tight leading-6 text-gray-600">{products?.length} items</p>
                </div>
                <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-y-0">
                    {products.map((product, index) => (
                        <WishlistProduct
                            key={index}
                            product={product}
                            onRemove={handleRemoveProduct}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
