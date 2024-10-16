import React, { useContext, useEffect } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContextProvider } from '../context/CartContext'
import { ToastContainer } from 'react-toastify'
import Header from '../components/Header'
const DashBoardLayout = () => {

    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {

        if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/sign-up')) {
            // Redirect to the home page
            navigate('/');
        }
    }, [isAuthenticated, location.pathname, navigate]);


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