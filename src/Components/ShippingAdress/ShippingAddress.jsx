
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function ShippingAddress() {

  let [isLoading, setIsLoading] = useState()

  const params = useParams();


  const initialValues = {
    city: '',
    phone: '',
    details: '',
  }

  const validationSchema = Yup.object({
    city: Yup.string().required('City is required'),
    phone: Yup.string().required('Phone is required'),
    details: Yup.string().required('Address Details is required'),
  })

  async function onSubmit() {
    setIsLoading(true)
    await axios.post('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' + params.id,
      { shippingAddress: values },
      {
        headers: {
          token: localStorage.getItem('token')
        },
        params: {
          url: 'http://localhost:5173'
        }

      }).then(({ data }) => {
        setIsLoading(false)
        window.open(data.session.url)

      }).catch(({ response }) => {
        setIsLoading(false)

        console.log(response.data.message);
      })
  }


  let { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return <>

    <div className="p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <form onSubmit={handleSubmit} className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input disabled type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={jwtDecode(localStorage.getItem('token')).name} />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="phone">Phone</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.phone} name="phone" type="tel" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+201123456789" />
                    {touched.phone && errors.phone && <div className='text-red-400'>*{errors.phone}</div>}
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="details">Address / Street</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" name="details" id="details" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="123 Maple Street" />
                    {touched.details && errors.details && <div className='text-red-400'>*{errors.details}</div>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="New York" />
                    {touched.city && errors.city && <div className='text-red-400'>*{errors.city}</div>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="country">Country / region</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                  </div>
                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button type='submit' className="bg-teal-600 hover:bg-teal-800 transition-all text-white font-bold py-2 px-4 rounded" disabled={isLoading}>Checkout {isLoading && <i class="fa-solid fa-spinner fa-spin"></i>}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div >
  </>
}
