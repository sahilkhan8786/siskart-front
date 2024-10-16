import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '../context/AuthContext';
import { CartContextProvider } from '../context/CartContext';
import { ProductsPageViewContextProvider } from '../context/ProductsPageViewContext';

const MainLayout = () => {
    return (
        <>
            <AuthContextProvider>
                <CartContextProvider>
                    <ProductsPageViewContextProvider>
                        <ToastContainer />
                        <Outlet />
                    </ProductsPageViewContextProvider>
                </CartContextProvider>
            </AuthContextProvider>

        </>
    );
};

export default MainLayout;
