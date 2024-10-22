import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CartContextProvider } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductsPageHeader from '../components/ProductsPageHeader'
import { ProductsPageViewContext } from '../context/ProductsPageViewContext'
import { RiMenu3Fill } from '../icons'
const RootLayout = () => {

    const { isAuthenticated } = useContext(AuthContext)
    const { isShowingSidebar, setIsShowingSidebar } = useContext(ProductsPageViewContext);
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
                <div className='max-w-screen-2xl w-full mx-auto xl:px-4 mt-48 sm:mt-52 md:mt-40 xl:mt-28'>
                    {isShowingSidebar && <aside className='w-full  xl:w-[22%] 3xl:w-[20%] 4xl:w-[15%] 5xl:w-[11%] 6xl:w-[9%] h-fit   fixed z-50'>
                        <ProductsPageHeader />
                    </aside>}
                    <div className='w-full xl:w-[75%] xl:ml-[25%] p-3'>
                        <Outlet />
                    </div>
                </div>

            </section>
        </CartContextProvider>

    )
}

export default RootLayout