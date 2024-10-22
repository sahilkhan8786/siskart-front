import React, { Suspense, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { fetchData } from '../../utils/https';
const LandingProductBox = ({ title, url, link }) => {


    return (
        <Suspense fallback={<div>Loading...</div>}>

            <div className='relative w-full  px-5 py-9 pb-4 border-2 border-blue rounded-xl my-12 over select-none z-30' >
                <h1 className='uppercase bg-blue-700 w-fit p-3 text-white absolute -top-8 left-0'>{title}</h1>

                <Slider url={url} />

                <div className='mt-6 flex items-center justify-center'>
                    <Link to={`/${link}`}>
                        <button className=' border-2 border-blue-500 text-white bg-blue-500 py-3 px-16 hover:bg-transparent hover:text-blue-500'>View All</button>
                    </Link>

                </div>
            </div>

        </Suspense>
    )
}

export default LandingProductBox;

const Slider = ({ url }) => {
    const [products, setProducts] = useState([]);



    useEffect(() => {
        (async () => {
            const productsArray = await fetchData(url);
            setProducts(productsArray?.data?.data.products)

        })();
    }, [])

    return (
        <div className='overflow-x-hidden h-[290px] overflow-y-hidden'>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                freeMode={true}
                breakpoints={{
                    500: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                    1440: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >

                {products.map(el => (
                    <SwiperSlide key={el._id}>
                        <article className='flex flex-col gap-3 items-center justify-center'>
                            <img src="https://m.media-amazon.com/images/I/61fDHkQ6MqL._AC_UY218_.jpg" alt="" />
                            <p className='text-center'>{el?.ALIAS}</p>
                            <div className='flex gap-4'>



                                <p className='text-center'>{el?.MRP}</p>
                                <p className='text-center'>{el?.Brand}</p>
                            </div>
                        </article>
                    </SwiperSlide>

                ))}

            </Swiper>
        </div>
    )
}