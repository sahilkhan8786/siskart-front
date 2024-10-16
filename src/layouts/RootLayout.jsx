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
                <div className='max-w-screen-2xl w-full mx-auto px-4 mt-36 sm:mt-40 md:mt-28 '>
                    {isShowingSidebar && <aside className='w-[15%] h-fit   fixed z-50'>
                        <ProductsPageHeader />
                    </aside>}
                    <div className={`${isShowingSidebar ? ' w-[75%]   ml-[25%]' : 'w-full '}`}>
                        <p
                            className={`flex lg:hidden gap-3 items-center  hover:text-blue-500 cursor-pointer`}
                            onClick={() => setIsShowingSidebar(prev => !prev)}
                        >
                            <RiMenu3Fill />
                            <span>
                                View All Products
                            </span>
                        </p>
                        <Outlet />
                    </div>
                </div>

            </section>
        </CartContextProvider>

    )
}

export default RootLayout