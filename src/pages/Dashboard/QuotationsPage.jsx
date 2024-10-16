import React, { useContext, useEffect, useState } from 'react'
import { deleteQuotation, getQuotations } from '../../../utils/https';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const QuotationsPage = () => {
    const [quotations, setQuotation] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const response = await getQuotations('quotations');
            setQuotation(response?.data?.data?.quotations)
            console.log(response?.data?.data?.quotations)
        })()
    }, [refreshData]);

    async function deleteQuotationHandler(id) {
        const proceed = window.confirm("Are you sure? It is irreversible");
        if (proceed) {
            const result = await deleteQuotation(`quotations/${id}`);
            console.log(result)
            setTimeout(() => { }, 2000)
            toast.success("Quotation Successfully Deleted",);

            setRefreshData(prevState => !prevState);
        }

    }

    const dateFormat = (date) => {
        const parsedDate = new Date(date);

        const year = parsedDate.getFullYear();

        const month = monthNames[parsedDate.getMonth()];
        const day = parsedDate.getDate(); month

        console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
        return `${year} - ${day} - ${month}`
    };

    return (
        <div>
            <ToastContainer />
            <h1 className='my-4 text-3xl font-semibold'>Quotations</h1>
            <div className='flex flex-col gap-5 px-4'>
                {
                    quotations?.map((quotation, i) => (
                        <div key={quotation._id} className=' border-b-2 pb-2 flex flex-col gap-3'>
                            <div className='flex w-full items-center justify-between'>

                                <p>
                                    {i + 1})
                                </p>
                                <p>
                                    Requested At : {dateFormat(quotation.createdAt)}
                                </p>

                                {user?.role === 'admin' && !quotation.isReviewed ?
                                    <p className='flex gap-3'>
                                        <Link to={`/checkQuotation/${quotation._id}`}>
                                            <button className='header-button'>Check Quotation</button>

                                        </Link>
                                        <button
                                            className=' bg-red-500 text-white px-3 hover:text-red-500 hover:bg-transparent border-2 border-red-500'
                                            onClick={() => deleteQuotationHandler(quotation._id)}
                                        >Delete  Quotation</button>
                                    </p> :
                                    quotation.isReviewed ?
                                        <p className='text-blue-500'>
                                            is Reviewed
                                        </p> :
                                        <p className='text-red-500'>
                                            Under Review
                                        </p>
                                }


                            </div>
                            {
                                <div className=' ' >
                                    {user?.role === 'admin' && (
                                        <div className='flex items-center gap-5 '>
                                            <span>
                                                Quotation Requested From :-
                                            </span>
                                            <h1 className='text-xl'> {quotation?.userId?.username}</h1>
                                        </div>
                                    )
                                    }
                                </div>
                            }
                        </div>
                    ))
                }
            </div >
        </div >
    )
}

export default QuotationsPage