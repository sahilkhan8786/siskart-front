import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { toast } from 'react-toastify'; // Import toast

const SingleProduct = ({ data, viewState }) => {
    const { addItemToCart } = useContext(CartContext);

    const handleAddToCart = (item) => {
        addItemToCart(item); // Add item to cart
        toast.success(`${item.slug.substring(0, 15)}... has been added to your cart!`); // Show toast
    };

    return (
        <div className='flex border p-4 rounded-xl hover:bg-gray-100'>
            {
                viewState === 'list' ?

                    (<div className='w-full flex flex-col sm:flex-row items-center   gap-3 '>

                        <img src="https://m.media-amazon.com/images/I/61fDHkQ6MqL._AC_UY218_.jpg" alt="" className='w-fit cursor-pointer' />
                        <div className='w-full flex flex-col gap-5'>
                            <Link to={`${data?.slug}`}>
                                <h1 className=' text-center hover:underline cursor-pointer'>{data?.slug}</h1>
                            </Link>
                            <p className=' text-center'>Rs. {data?.MRP}/-</p>
                            <p className=' text-center'> Brand - {data?.Brand}</p>
                            <div className='flex w-full items-center justify-center gap-6 flex-col sm:flex-row'>
                                <button className='header-button w-full sm:w-fit whitespace-nowrap'
                                    onClick={() => handleAddToCart(data)}>
                                    Add to Cart
                                </button>
                                <button className='header-button w-full sm:w-fit whitespace-nowrap'>Add to Wishlist</button>
                            </div>
                        </div>

                    </div>)
                    :
                    (<div className='w-full flex flex-col  gap-3 items-center justify-between'>

                        <img src="https://m.media-amazon.com/images/I/61fDHkQ6MqL._AC_UY218_.jpg" alt="" className='w-fit cursor-pointer' />
                        <div className='w-full flex flex-col gap-5'>
                            <Link to={`${data?.slug}`}>
                                <h1 className=' text-center hover:underline cursor-pointer'>{data?.slug.substring(0, 25)}...</h1>
                            </Link>
                            <p className=' text-center'>Rs. {data?.MRP}/-</p>
                            <p className=' text-center'>Brand - {data?.Brand}</p>
                            <div className='flex w-full items-center justify-center gap-3 flex-col'>
                                <button className='header-button w-full'
                                    onClick={() => handleAddToCart(data)}>
                                    Add to Cart
                                </button>
                                <button className='header-button w-full'>Add to Wishlist</button>
                            </div>
                        </div>

                    </div>)
            }
        </div>
    )
}

export default SingleProduct