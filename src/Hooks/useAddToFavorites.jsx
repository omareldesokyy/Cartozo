import { useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

export default function useAddToFavorites() {
    const [wishItems, setWishItems] = useState([]);

    const addToFavorites = (id, product) => {
        axios.post(
            'https://ecommerce.routemisr.com/api/v1/wishlist',
            { "productId": id },
            { headers: { "token": localStorage.getItem("token") } }
        ).then(({ data }) => {
            // Update wishItems state with new item
            setWishItems(data.data);

            toast(product?.title + ' Added To Wishlist ✨', {
                toastId:id,
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
        }).catch(() => {
            toast.error('Failed To Add ' + product?.title + ' To Wishlist', {
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
        });
    };

    return { wishItems, setWishItems, addToFavorites };
}
