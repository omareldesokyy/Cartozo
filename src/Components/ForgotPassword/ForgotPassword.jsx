import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../Contexts/AuthContextProvider'
import { Bounce, toast } from 'react-toastify'
import VerifyCode from '../VerifyCode/VerifyCode'

export default function ForgotPassword() {

  let [isLoading, setIsLoading] = useState()

  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required*'),
  })

  function onSubmit() {
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
      .then(({ data }) => {
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
        setIsLoading(false)
      })
      .catch(({ response }) => {
        setIsLoading(false)
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
        <img className='h-56 min-h-[calc(100vh-112px-268.8px)] object-contain' src="/imgs/forgotpassword.jpg" alt="" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 border-4 rounded-full border-blue-400 border-t-8"></div>
        <div className="absolute -bottom-32 -left-8 w-64 h-64 border-4 rounded-full border-blue-400 border-t-8"></div>
        <div className="absolute -top-32 -right-8 w-64 h-64 border-4 rounded-full border-blue-400 border-t-8"></div>
        <div className="absolute -top-20 -right-24 w-64 h-64 border-4 rounded-full border-blue-400 border-t-8"></div>
      </div>

      <div className="flex flex-col md:w-1/2 justify-center items-center bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              className="pl-2 outline-none border-none w-full"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>
          {touched && <div className='mb-2 text-red-500' ><p> {errors.email} </p></div>}

          <button
            type="submit"
            className="w-full bg-teal-600 py-2 rounded-2xl text-white font-semibold mb-2 disabled:bg-gray-300"
            disabled={isLoading}
          >
            Send Code {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
        </form>
        <VerifyCode />

      </div>
    </div>


  </>
}
