import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../LoadingScreen/Loading';
import { useQuery } from '@tanstack/react-query';


export default function Categories() {

    const getCategories = async () => {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
    }

    const { isError, data:categories, error, isLoading, isFetched } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    });


    const navigate = useNavigate();

    function goToProductsByCategory(id) {
        navigate('/products/category/' + id)
    }



    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    if (isFetched) {
        return <>
            <div className="grid py-6 px-8 grid-cols-5 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {categories.map((category, index) => {
                    return <div key={index} onClick={() => goToProductsByCategory(category?._id)} className="relative  rounded-sm overflow-hidden group cursor-pointer">
                        <img src={category.image} alt={category.name + 'image'} className="h-full w-full object-cover" />
                        <span className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{category.name}</span>
                    </div>
                })}
            </div>
        </>
    }
}
