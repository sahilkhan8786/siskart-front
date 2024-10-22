import React, { useContext, useEffect, useState } from 'react'
import SingleProduct from '../components/SingleProduct'
import { useLocation } from 'react-router-dom'
import { fetchData } from '../../utils/https';
import { FaList, IoGrid } from '../icons'


const ProductPage = () => {
    const { pathname, search } = useLocation();
    const [products, setProducts] = useState([]);
    const [viewState, setViewState] = useState('grid');

    function toggleGrid(viewStyle) {
        if (viewStyle === 'grid') setViewState('list');
        if (viewStyle === 'list') setViewState('grid');
    };

    function handleResize(e) {
        if (window.innerWidth < 768) {
            setViewState('list')
        } else {
            setViewState('grid')
        }
    }

    const filterSearch = search.replaceAll('%20', ' ')
    console.log(filterSearch)


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])



    useEffect(() => {
        (async () => {
            const productsArray = await fetchData(`${pathname}${filterSearch}&fields=ALIAS,MRP,Brand,ItemGroup,slug`)
            setProducts(productsArray?.data?.data?.products)
        })()
    }, [filterSearch])
    return (
        <div >
            {/* VIEW TYPE - LIST/GRID */}
            <div className='bg-gray-100 flex w-full p-3 gap-12'>
                <p
                    className={`hidden lg:flex gap-3 items-center  hover:text-blue-500 cursor-pointer  ${viewState === 'list' && 'text-blue-500'}`}
                    onClick={() => toggleGrid('grid')}
                >
                    <FaList />
                    <span>
                        List View
                    </span>
                </p>
                <p
                    className={`hidden lg:flex gap-3 items-center  hover:text-blue-500 cursor-pointer ${viewState === 'grid' && 'text-blue-500'}`}
                    onClick={() => toggleGrid('list')}
                >
                    <IoGrid />
                    <span>
                        Grid View
                    </span>
                </p>

            </div>



            <div className={`grid mt-6  gap-5 mb-12 ${viewState === 'grid' ? 'grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>

                {products.map(el => (
                    <SingleProduct key={el._id} data={el} viewState={viewState} />
                ))}
            </div>
        </div>
    )
}

export default ProductPage