import React, { Children, useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'
import Home from './../Home/Home';

export default function ProtectAuthRoutes({children}) {
    let {token} = useContext(AuthContext);
  return <>
        {!token ? children : <Home/>}
    </>
}
