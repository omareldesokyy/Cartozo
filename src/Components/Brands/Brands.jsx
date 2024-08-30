import React from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../LoadingScreen/Loading';
import { useQuery } from '@tanstack/react-query';

export default function Brands() {

    const getBrands = async () => {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
    }

    const { isError, data: brands, error, isLoading, isFetched } = useQuery({
        queryKey: ['brands'],
        queryFn: getBrands
    });


    const navigate = useNavigate();

    function goToProductsByBrand(id) {
        navigate('/products/brand/' + id)
    }


    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (isFetched) {
        return (
            <div className="grid grid-cols-5 py-6 px-8 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {brands.map((brand, index) => {
                    return <div key={index} onClick={() => goToProductsByBrand(brand?._id)} className="relative  rounded-sm overflow-hidden group cursor-pointer">
                        <img src={brand.image} alt={brand.name + 'image'} className="h-full w-full object-cover" />
                        <span className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"></span>
                    </div>
                })}
            </div>
        )
    }
}
