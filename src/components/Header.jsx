import React, { useContext, useState } from 'react'
import { FaShoppingCart, RiMenu3Fill, MdOutlineLogout } from '../icons'
import { HeaderSearchBarDesktop, HeaderSearchBarMobile } from './HeaderSearchBar';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';



const Header = () => {
    const { calculateTotalItems } = useContext(CartContext);
    const { isAuthenticated, user, logOut } = useContext(AuthContext);

    const [isNavOpen, setIsNavOpen] = useState(false)

    function toggleNavHandler() {
        setIsNavOpen(prev => !prev);
    }


    return (
        <header className='w-full bg-white/75 backdrop-blur-xl border-b border-blue-500 fixed top-0 left-0 z-40'>
            <nav className='w-full max-w-screen-2xl mx-auto py-5 flex items-center justify-between px-4'>
                {/* LOGO */}
                <Link to={'/'}>
                    <h1 className='uppercase font-bold text-2xl text-blue-500 cursor-pointer'>Siskart</h1>
                </Link>

                {/* SEARCH BAR  DESKTOP VIEW*/}
                <HeaderSearchBarDesktop />



                {/* WIDGETS */}
                <div>
                    <Link to={'/cart'}>
                        <aside className='relative'>
                            {calculateTotalItems() === 0 ? '' :
                                <>
                                    <span className='header-cart-no'> {calculateTotalItems()}</span>
                                </>
                            }
                            <FaShoppingCart className='icons' />
                        </aside>
                    </Link>
                </div>
                {/* HAM ICON */}
                <div className='md:hidden'>
                    <RiMenu3Fill className='icons'
                        onClick={toggleNavHandler} />
                </div>

                {/* SIGN IN / SIGN UP */}
                {isAuthenticated ?
                    (
                        <>
                            <Link to={`/user/${user?.username}`}>
                                <h1 className='text-black hover:underline'>{user?.username}</h1>
                            </Link>
                            <MdOutlineLogout className='cursor-pointer' onClick={logOut} />
                        </>
                    )
                    : (<div className='sm:flex items-center gap-4 hidden'>
                        <Link to={'/login'}>

                            <button className='header-button'>Log in</button>
                        </Link>
                        <Link to={'/sign-up'}>
                            <button className='header-button'>Sign Up</button>
                        </Link>
                    </div>)


                }
                {/* NAV BAR FOR MOBILE VIEW */}
                {isNavOpen && <div className='bg-black/45 w-full absolute  top-0 left-0 h-screen sm:hidden' onClick={toggleNavHandler}>


                    <ul className=' bg-white  flex items-start w-3/4 justify-center flex-col h-full pl-6 gap-4'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Products</li>
                        <li>Contact Us</li>
                        <li>Login</li>
                        <Link to={'/sign-up'}>
                            <li>Sign up</li>
                        </Link>
                        <span className='absolute right-2 top-2 z-50 font-bold cursor-pointer text-xl ' onClick={toggleNavHandler}>X</span>
                    </ul>
                </div>}

            </nav>
            {/* SEARCH BAR  MOBILE VIEW VIEW*/}
            <HeaderSearchBarMobile />


        </header>
    )
}

export default Header