import React, { useContext, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContextProvider';
import $ from "jquery"


export default function Navbar() {

  let { token, setToken } = useContext(AuthContext)

  function signout() {
    setToken(null)
    localStorage.removeItem('token');
  }

  function NavList() {
    if ($('#nav-items').hasClass('hidden')) {
      $('#nav-items').slideDown(300, () => {
        $('#nav-items').removeClass('hidden');
        $('#nav-items').removeAttr('style');
      });
    }
    else {
      $('#nav-items').slideUp(300, () => {
        $('#nav-items').addClass('hidden');
        $('#nav-items').removeAttr('style');
      });
    }
    if ($('#nav-icons').hasClass('hidden')) {
      $('#nav-icons').slideDown(300, () => {
        $('#nav-icons').removeClass('hidden');
        $('#nav-icons').removeAttr('style');
      });
    }
    else {
      $('#nav-icons').slideUp(300, () => {
        $('#nav-icons').addClass('hidden');
        $('#nav-icons').removeAttr('style');
      });
    }
  }

  return <>
    <div className="bg-slate-700 p-8 text-lg font-[Montserrat] relative z-10 top-0 w-full font-bold min-w-[400px]">
      <nav className="container m-auto relative max-lg:space-y-4 text-white select-none bg-grey lg:flex lg:items-stretch w-full ">
        <div className="flex text-2xl flex-no-shrink items-stretch h-12">
          <img src="/imgs/shopping-cart.svg" alt="cart logo" />
          <a href="#" className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal no-underline flex items-center hover:bg-grey-dark">Cartozo</a>
          <button onClick={NavList} id='navBtn' className="block lg:hidden cursor-pointer ml-auto">
            <div className='flex justify-center items-center gap-4 bg-teal-500 border border-transparent duration-300 relative px-3 py-2 rounded-md focus:outline focus:outline-white'>
              <span>Menu</span>
              <i className="fa-solid fa-bars"></i>
            </div>
          </button>
        </div>
        {token && <>
          <div id='nav-items' className="hidden gap-3 lg:flex lg:items-stretch lg:justify-end ml-auto">
            <NavLink to={'/home'} className="border border-transparent  duration-300 relative ms-2 py-2 px-4 leading-normal no-underline flex items-center rounded-md  hover:border-teal-500">Home</NavLink>
            <NavLink to={'/products'} className="border border-transparent relative py-2 duration-300  px-4 leading-normal no-underline flex items-center rounded-md  hover:border-teal-500">Products</NavLink>
            <NavLink to={'/categories'} className="border border-transparent relative py-2  duration-300 px-4 leading-normal no-underline flex items-center rounded-md  hover:border-teal-500">Categories</NavLink>
            <NavLink to={'/brands'} className="border border-transparent relative py-2  duration-300 px-4 leading-normal no-underline flex items-center rounded-md  hover:border-teal-500">Brands</NavLink>
          </div>
          <div id='nav-icons' className="hidden gap-3 lg:flex lg:items-center lg:justify-end ml-auto ">
            <Link to={'/wishlist'} className="h-16 border border-transparent relative py-2 px-4 leading-normal duration-300 no-underline flex items-center rounded-md transition-all hover:animate-bounce "><img src="/imgs/wishlist.png" alt="go to cart image" className='h-full' /></Link>
            <Link to={'/cart'} className="h-16 border border-transparent relative py-2 px-4 leading-normal duration-300 no-underline flex items-center rounded-md transition-all hover:animate-slideX "><img src="/imgs/cart-check.svg" alt="go to cart image" className='h-full' /></Link>
            <img onClick={signout} src='/imgs/logout.svg' alt='logout image' className="h-10 duration-300 ps-3  ms-2 cursor-pointer relative transition-all hover:translate-x-2" />
          </div>
        </>
        }
        {!token && <>
          <div id='nav-items' className="hidden gap-3 lg:flex lg:items-stretch lg:justify-end ml-auto">
            <Link to={'/login'} className="border border-transparent  duration-300 relative ms-2 py-2 px-4 leading-normal no-underline flex items-center rounded-md  hover:border-teal-500">Login</Link>
            <Link to={'/signup'} className="border border-transparent relative py-2 duration-300  px-4 leading-normal no-underline flex items-center rounded-md  hover:border-teal-500">Signup</Link>
            </div>
        </>
        }
      </nav>
    </div>
  </>

}

