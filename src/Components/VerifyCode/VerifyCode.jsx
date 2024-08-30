import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

export default function VerifyCode() {

    let [isLoading, setIsLoading] = useState()
    const navigate = useNavigate()


    const initialValues = {
        resetCode: '',
    }

    const validationSchema = Yup.object({
        resetCode: Yup.string().required('Reset Code is required*'),
    })

    function onSubmit() {
        setIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            .then(() => {
                setIsLoading(false)
                navigate('/Cartozo/forgotPassword/resetPassword')

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
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd" />
                </svg>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.resetCode}
                    className="pl-2 outline-none border-none w-full"
                    type="text"
                    name="resetCode"
                    placeholder="Reset Code"
                />
            </div>
            {touched && <div className='mb-2 text-red-500' ><p> {errors.resetCode} </p></div>}

            <button
                type="submit"
                className="w-full bg-teal-600 py-2 rounded-2xl text-white font-semibold mb-2 disabled:bg-gray-300"
                disabled={isLoading}
            >
                Done {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
        </form>

    </>
}
