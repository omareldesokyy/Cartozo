import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Cart from '../Cart/Cart'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Layout from '../Layout/Layout'
import Signup from './../Signup/Signup';
import Products from '../Products/Products'
import ProductDetails from '../ProductDetails/ProductDetails'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AuthContextProvider from '../Contexts/AuthContextProvider'
import ProtectAuthRoutes from '../ProtectAuthRoutes/ProtectAuthRoutes'
import ShippingAddress from '../ShippingAdress/ShippingAddress'
import AllOrders from '../AllOrders/AllOrders'
import ProductsByCategory from '../ProductsByCategory/ProductsByCategory'
import ProductsByBrand from '../ProductsByBrand/ProductsByBrand'
import Categories from '../Categories/Categories'
import Brands from '../Brands/Brands'
import Wishlist from '../Wishlist/Wishlist'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import ResetPassword from '../ResetPassword/ResetPassword'
import NotFound from '../NotFound/NotFound'
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'


export default function App() {

  // Create a client
  const queryClient = new QueryClient()
  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path:'/Cartozo/' , element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: '/Cartozo/home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: '/Cartozo/cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: '/Cartozo/products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: '/Cartozo/login', element: <ProtectAuthRoutes> <Login /> </ProtectAuthRoutes> },
        { path: '/Cartozo/forgotPassword', element: <ProtectAuthRoutes> <ForgotPassword /> </ProtectAuthRoutes> },
        { path: '/Cartozo/signup', element: <ProtectAuthRoutes> <Signup /> </ProtectAuthRoutes> },
        { path: '/Cartozo/allorders', element: <ProtectedRoute> <AllOrders /> </ProtectedRoute> },
        { path: '/Cartozo/products/category/:id', element: <ProtectedRoute> <ProductsByCategory /> </ProtectedRoute> },
        { path: '/Cartozo/products/brand/:id', element: <ProtectedRoute> <ProductsByBrand /> </ProtectedRoute> },
        { path: '/Cartozo/ProductDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: '/Cartozo/ShippingAddress/:id', element: <ProtectedRoute> <ShippingAddress /> </ProtectedRoute> },
        { path: '/Cartozo/categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: '/Cartozo/wishlist', element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },
        { path: '/Cartozo/brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: '/Cartozo/forgotPassword/resetPassword', element: <ProtectAuthRoutes> <ResetPassword /> </ProtectAuthRoutes> },
        { path: '/Cartozo/*', element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router}  />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}


