import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

export default function Signup() {

  let [isLoading, setIsLoading] = useState()

  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 charachters').max(15, 'Maximum 15 charachters').required('Name is required*').matches(/[a-zA-Z]/, 'Must contain at least one letter'),
    email: Yup.string().email('Invalid email address').required('Email is required*'),
    password: Yup.string().required('Password is required*').min(6, 'Password must be 6 characters or more'),
    rePassword: Yup.string().required('RePassword is required*').oneOf([Yup.ref('password')], 'Password does not match'),
    phone: Yup.string().required('Phone is required*'),
  })

  function onSubmit() {

    setIsLoading(true)

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then(({ data }) => {
        setIsLoading(false)
        navigate('/login')
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      })
      .catch(({ response }) => {
        setIsLoading(false)
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      })
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
        <img className='h-56 min-h-[calc(100vh-112px-268.8px)] object-contain' src="/imgs/Signup.jpg" alt="signup image" />
        <div className="absolute border-orange-400 -bottom-32 -left-40 w-80 h-80 border-4 rounded-full  border-t-8"></div>
        <div className="absolute border-orange-400 -bottom-40 -left-20 w-80 h-80 border-4 rounded-full  border-t-8"></div>
        <div className="absolute border-orange-400 -top-40 -right-0 w-80 h-80 border-4 rounded-full  border-t-8"></div>
        <div className="absolute border-orange-400 -top-20 -right-20 w-80 h-80 border-4 rounded-full  border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form onSubmit={handleSubmit} className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl my-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd" />
            </svg>
            <input onBlur={handleBlur} onChange={handleChange} value={values.name} className="pl-2 outline-none border-none" type="text" name="name" id="" placeholder="Full name" />
          </div>
          {touched.name && <p className='text-red-500'>{errors.name}</p>}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl my-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} className="pl-2 outline-none border-none" type="email" name="email" id="" placeholder="Email Address" />
          </div>
          {touched.email && <p className='text-red-500'>{errors.email}</p>}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl my-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd" />
            </svg>
            <input onBlur={handleBlur} onChange={handleChange} value={values.password} className="pl-2 outline-none border-none" type="password" name="password" id="" placeholder="Password" />
          </div>
          {touched.password && <p className='text-red-500'>{errors.password}</p>}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl my-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd" />
            </svg>
            <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} className="pl-2 outline-none border-none" type="password" name="rePassword" id="" placeholder="Re-Password" />
          </div>
          {touched.rePassword && <p className='text-red-500'>{errors.rePassword}</p>}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl my-1 ">
            <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="IconChangeColor" ><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" id="mainIconPathAttribute" fill="rgb(156 163 175)"></path></svg>
            <input onBlur={handleBlur} onChange={handleChange} value={values.phone} className=" pl-2 outline-none border-none" type="tel" name="phone" id="" placeholder="Mobile" />
          </div>
          {touched.phone && <p className='text-red-500'>{errors.phone}</p>}

          <button type="submit" className='block w-full bg-teal-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 disabled:bg-gray-300' disabled={isLoading}>Sign Up {isLoading && <i class="fa-solid fa-spinner fa-spin"></i>} </button>
          <span className="text-sm ml-2 cursor-pointer">Already have an account ?  <Link className='hover:text-teal-500 text-[16px] font-semibold' to={'/login'}> Login </Link></span>
        </form>
      </div>
    </div>
  </>
}
