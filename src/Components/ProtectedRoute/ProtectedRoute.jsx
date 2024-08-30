import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {

   let {token} =  useContext(AuthContext)

  return <>
        {token ? children : <Login/>}
  </>
  
}
