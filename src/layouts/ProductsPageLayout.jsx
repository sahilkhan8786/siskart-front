import React, { useContext } from 'react'
import ProductsPageHeader from '../components/ProductsPageHeader'
import { Outlet } from 'react-router-dom'
import { ProductsPageViewContext } from '../context/ProductsPageViewContext'


const ProductsPageLayout = () => {
    const { isShowingSidebar } = useContext(ProductsPageViewContext);

    return (


        <div className='w-full flex'>
            {isShowingSidebar && <aside className='w-[15%] h-fit   fixed '>
                <ProductsPageHeader />
            </aside>}
            <div className={`${isShowingSidebar ? ' w-[85%]   ml-[15%]' : 'w-full'}`}>
                <Outlet />
            </div>
        </div>

    )
}

export default ProductsPageLayout