import React, { useContext } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContextProvider } from '../context/CartContext'
import { ToastContainer } from 'react-toastify'
import Header from '../components/Header'
const DashBoardLayout = () => {

    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/login')
    }

    return (
        <CartContextProvider>
            <section className='w-full font-poppin'>
                <ToastContainer />
                <Header />
                <div className='max-w-screen-2xl w-full mx-auto px-4 mt-36 sm:mt-40 md:mt-28 flex'>
                    <div>
                        <DashboardSidebar />
                    </div>
                    <div className='flex-1 '>
                        <Outlet />
                    </div>

                </div>

            </section>
        </CartContextProvider>
    )

    // <div className='flex gap-4'>
    //     <div>
    //         <DashboardSidebar />
    //     </div>
    //     <div className='flex-1 '>
    //         <Outlet />
    //     </div>

    // </div>
    // )
}

export default DashBoardLayout