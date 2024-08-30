import React from 'react'
import Product from '../Product/Product';
import Loading from '../LoadingScreen/Loading';
import { useQuery } from '@tanstack/react-query';

export default function Recommended() {
    const getProducts = async () => {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
    }

    const { isError, data: products, error, isLoading, isFetched } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (isFetched) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.slice(0, 8).map((product, index) => {
                        return <Product key={index} product={product} index={index} />
                    })}
                </div>
            </>
        )
    }

}
