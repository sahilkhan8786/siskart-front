import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom';
import { approveQuotation, checkQuotation } from '../../../utils/https';

const CheckQuotationsPage = () => {
    const [quotation, setQuotation] = useState({})
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();
    const id = pathname.split('/').at(2);

    useEffect(() => {
        (async () => {
            const result = await checkQuotation(`quotations/checkquotation/${id}`)
            setQuotation(result)
            console.log(result)
        })()
    }, []);

    const approveQuotationHandler = async () => {
        const result = await approveQuotation(`quotations/approveQuotation/${id}`)
        console.log(result)
        return result
    };


    if (user.role !== 'admin') {
        return (
            <>
                <h1>You are not Allowed to access this Page</h1>
                <Link to={`/user/${user._id}/quotations`}>
                    <button >Go to Quotations Page</button>
                </Link>
            </>
        )
    }

    function NLCCalcualte(Amount, qty, GST) {

        return Math.round((Amount / qty) + (Amount / qty) * (GST * 2 / 100))
    }


    return (
        <div className='max-w-screen-2xl mx-auto p-4 font-poppin'>
            <Link to={`/user/${user.username}/quotations`}>
                <button className='header-button'>
                    Go Back
                </button>
            </Link>
            <h1 className='text-center text-xl font-semibold uppercase'>Checking Quotation</h1>
            <p className='text-center mb-6'>Quotation Id:- {quotation._id}</p>
            {/* USER DETAILS */}

            <div className='border p-6'>
                <span className='text-gray-400 text-sm'>User Details</span>
                <article className='flex gap-4'>
                    <span>Username:- </span>
                    <span className=''>{quotation?.userId?.username}</span>
                </article>
                <article className='flex gap-4'>
                    <span>Email:- </span>
                    <span className=''>{quotation?.userId?.email}</span>
                </article>
            </div>

            {/* PRODUCTS */}
            <div className='flex justify-between w-full px-4 border my-6 font-bold uppercase py-3'>
                <h1 className='flex-[2] items-start justify-start flex'>ALIAS</h1>
                <h1 className='check-quotation-heads'>MRP</h1>
                <h1 className='check-quotation-heads'>Sale Price</h1>
                <h1 className='check-quotation-heads'>Retail Price</h1>
                <h1 className='check-quotation-heads'> Price</h1>
                <h1 className='check-quotation-heads'> Amount</h1>
                <h1 className='check-quotation-heads'> NLC</h1>
                <h1 className='check-quotation-heads'>Quantity Available</h1>
                <h1 className='check-quotation-heads'>Quantity Ordered</h1>
            </div>




            <div className='border py-3 flex flex-col gap-3 border-b-transparent'>

                {quotation?.products?.map(product => (

                    <div key={product._id} className='flex justify-between w-full px-4 gap-4  border-b pb-3'>
                        <h1 className='flex-[2] items-start justify-start flex'>{product?.productsId?.ALIAS}</h1>
                        <input type="text" className='w-16 flex-1'
                            value={product?.productsId?.MRP || ''}
                            readOnly
                        />
                        <input type="text" className='w-16  flex-1'
                            value={product?.productsId?.Sale_price || ''}
                            readOnly
                        />
                        <input type="text" className='w-16  flex-1'
                            value={product?.productsId?.RetailPrice || ''}
                            readOnly
                        />
                        <input type="text" className='w-16  flex-1'
                            value={product?.productsId?.Price || ''}
                            readOnly
                        />
                        <input type="text" className='w-16  flex-1'
                            value={product?.productsId?.Amount || ''}
                            readOnly
                        />
                        <h1 className='check-quotation-heads'>
                            {NLCCalcualte(product?.productsId?.Amount, product?.productsId?.QTY, product?.productsId?.GST)}

                        </h1>
                        <input type="text" className='w-16  flex-1'
                            value={product?.productsId?.QTY || ''}
                            readOnly
                        />
                        <input type="text" className='w-16  flex-1'
                            value={product?.quantity || ''}
                            readOnly
                        />

                    </div>

                ))}

            </div>

            <div className='flex w-full justify-end gap-4 my-6'>
                <Link to={`/user/${user?.username}/quotations`}>
                    <button className='px-3 bg-red-500 border-2 border-red-500 text-white py-3 hover:text-red-500 hover:bg-transparent'>
                        Cancel
                    </button>
                </Link>

                <button className='header-button'
                    onClick={approveQuotationHandler}
                >
                    Approve Quotation
                </button>

            </div>

        </div>
    )
}

export default CheckQuotationsPage
