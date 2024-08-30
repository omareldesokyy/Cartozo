import axios from 'axios'
import { Bounce, toast } from 'react-toastify';

export default function useAddToCart(id,product) {

    axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            "productId": id
        },
        {
            headers: {
                "token": localStorage.getItem("token")
            }
        }
    ).then(()=>{
        toast(product?.title + ' Added To Cart 🛒', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,

        });
    }).catch(()=>{
        toast.error('Failed To Add ' + product?.title + ' Cart' , {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    })

}