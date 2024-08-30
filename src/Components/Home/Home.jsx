import React, { useContext, useEffect, useState } from 'react'
import Style from './Home.module.css'
import { Link } from 'react-router-dom'
import Categories from './../Categories/Categories';
import Recommended from '../Recommended/Recommended';


export default function Home() {


  return <>
    <div className="bg-cover bg-no-repeat bg-center h-screen flex items-center relative bg-fixed" style={{ backgroundImage: 'url("/Cartozo/imgs/shopping-bag-cart.jpg")' }}>
      <div className="container m-auto px-8">
        <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
          The next generation <br /> of e-commerce
        </h1>
        <p>Unlimited Choices, Delivered to You.</p>
        <div className="mt-12">
          <Link to={"/products"} className="bg-primary border border-[#334155] text-[#334155] px-8 py-3 font-medium 
              rounded-md hover:bg-orange-400 duration-200">Shop Now</Link>
        </div>
      </div>
      <span className={`${Style.loader} absolute bottom-16 left-1/2 transform -translate-x-1/2`}></span>
    </div>
    <div className="container m-auto py-16">
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/Cartozo/imgs/free-shipping.svg" alt="Delivery" className="w-12 h-12 object-contain" />
          <div>
            <h4 className="font-medium capitalize text-lg">Free Shipping</h4>
            <p className="text-gray-500 text-sm">Order over 200 L.E</p>
          </div>
        </div>
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/Cartozo/imgs/refund-claim.svg" alt="Delivery" className="w-12 h-12 object-contain" />
          <div>
            <h4 className="font-medium capitalize text-lg">Money Rturns</h4>
            <p className="text-gray-500 text-sm">30 days money returs</p>
          </div>
        </div>
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/Cartozo/imgs/customer-service.svg" alt="Delivery" className="w-12 h-12 object-contain" />
          <div>
            <h4 className="font-medium capitalize text-lg">24-Hours Support</h4>
            <p className="text-gray-500 text-sm">Customer support</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container m-auto py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6 px-8">shop by category</h2>
        <Categories />
    </div>
    <div className="container m-auto pb-16 px-8">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
      <Recommended />
    </div>
  </>
}
