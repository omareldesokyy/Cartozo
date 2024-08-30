import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../Contexts/AuthContextProvider'
import { Bounce, toast } from 'react-toastify'

export default function Login() {

  let [isLoading, setIsLoading] = useState()

  let { token, setToken } = useContext(AuthContext)

  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  }



  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  function onSubmit(values) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(({ data }) => {
        setIsLoading(false);
        const targetPath = location.pathname === '/login' ? '/home' : location.pathname;
        navigate(targetPath);
        setToken(data.token);
        localStorage.setItem('token', data.token);

        toast.success('Welcome Back, ' + data.user.name, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      })
      .catch(({ response }) => {
        setIsLoading(false);
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      });
  }


  let { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return <>
    <div className="min-h-[calc(100vh-112px-268.8px)] md:flex">
      <div
        className="min-h-[calc(100vh-112px-268.8px)] relative hidden md:flex w-1/2 justify-center items-center bg-cover bg-no-repeat bg-center"
      >
        <img className='h-56 min-h-[calc(100vh-112px-268.8px)] object-contain' src="/imgs/Login.jpg" alt="" />
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-orange-400 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-orange-400 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-orange-400 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-orange-400 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form onSubmit={handleSubmit} className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} className="pl-2 outline-none border-none" type="email" name="email" placeholder="Email Address" />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd" />
            </svg>
            <input onBlur={handleBlur} onChange={handleChange} value={values.password} className="pl-2 outline-none border-none" type="password" name="password" placeholder="Password" />
          </div>
          <button type="submit" className="block w-full bg-teal-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 disabled:bg-gray-300" disabled={isLoading}>Login {isLoading && <i class="fa-solid fa-spinner fa-spin"></i>}</button>
          <div className='flex flex-col justify-center items-center'>
            <p className="text-sm ml-2 cursor-pointer">Do not have an account ?  <Link className='hover:text-teal-500 text-[16px] font-semibold' to={'/signup'}> Signup </Link></p>
            <p>or</p>
            <p className="text-sm ml-2 cursor-pointer"><Link className='hover:text-teal-500 text-[16px] font-semibold' to={'/forgotPassword'}> Forget your password ?</Link></p>
          </div>
        </form>
      </div>
    </div>
  </>
}
