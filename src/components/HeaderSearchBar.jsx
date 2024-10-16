import React, { useEffect, useState } from 'react';
import { FaSearch, FaSpinner } from '../icons';
import { fetchData } from '../../utils/https';
import { Link } from 'react-router-dom';

// Shared search logic and state for desktop and mobile
const useSearch = () => {
    const [products, setProducts] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [isShowing, setIsShowing] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        const result = await fetchData(`products?search=${inputValue}&limit=5`);
        setProducts(result.data.data.products);
        setIsLoading(false);
    };

    const changeHandler = (e) => {
        const { value } = e.target;
        setInputValue(value);
        setIsShowing(true);
        if (typingTimeout) clearTimeout(typingTimeout);

        setIsLoading(true);

        setTypingTimeout(
            setTimeout(() => {
                if (value.length > 1) {
                    fetchProducts();
                    setIsShowing(true);
                } else {
                    setIsLoading(false);
                    setProducts([]);
                    setIsShowing(true);
                }
            }, 1000)
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShowing(false);
        }, 7000);

        return () => {
            clearTimeout(timer);
        };
    }, [isShowing]);

    return {
        products,
        inputValue,
        isLoading,
        isShowing,
        setInputValue,
        changeHandler,
        fetchProducts,
        setIsShowing,
    };
};

export const HeaderSearchBarDesktop = () => {
    const {
        products,
        inputValue,
        isLoading,
        isShowing,
        setInputValue,
        changeHandler,
        fetchProducts,
        setIsShowing,
    } = useSearch();

    const submitHandler = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <div className="relative">
            <form
                className="items-center rounded-t-xl border justify-between overflow-hidden hidden md:flex"
                onSubmit={submitHandler}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent lg:w-[450px] focus:outline-none px-4 py-2"
                    value={inputValue}
                    onChange={changeHandler}
                />
                <button className="cursor-pointer" type="submit">
                    <FaSearch className="h-full text-xl mx-2" />
                </button>
            </form>

            {products.length > 0 && inputValue.length > 1 && isShowing ? (
                <ul className="absolute bg-gray-100 w-full rounded-b-xl p-4 flex flex-col gap-2 z-40">
                    {products.map((product) => (
                        <Link to={`products/${product.slug}`} key={product._id}>
                            <li
                                className="bg-white p-2 rounded-xl cursor-pointer hover:underline"
                                onClick={() => {
                                    setIsShowing(false);
                                    setInputValue('');
                                }}
                            >
                                {product?.slug}
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : isLoading && inputValue.length > 1 && (
                <div className="absolute mx-2 w-full bg-gray-100 p-4 flex items-center justify-center">
                    <FaSpinner className="animate-spin text-xl" />
                </div>
            )}
        </div>
    );
};

export const HeaderSearchBarMobile = () => {
    const {
        products,
        inputValue,
        isLoading,
        isShowing,
        setInputValue,
        changeHandler,
        setIsShowing,
    } = useSearch();

    return (
        <div className='relative'>



            <form className=" items-center rounded-xl border justify-between z-50 overflow-hidden flex mx-2 mb-2 md:hidden">
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent w-full focus:outline-none px-4 py-2"
                    value={inputValue}
                    onChange={changeHandler}
                />
                <FaSearch className="cursor-pointer h-full text-xl mx-2" />

                {products.length > 0 && inputValue.length > 1 && isShowing ? (
                    <ul className="absolute top-12 bg-gray-100 w-full rounded-b-xl p-4 flex flex-col gap-2 z-40">
                        {products.map((product) => (
                            <Link to={`products/${product.slug}`} key={product._id}>
                                <li
                                    className="bg-white p-2 rounded-xl cursor-pointer hover:underline"
                                    onClick={() => {
                                        setIsShowing(false);
                                        setInputValue('');
                                    }}
                                >
                                    {product?.slug.substring(0, 15)}...
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : isLoading && inputValue.length > 1 && (
                    <div className="absolute mx-2 w-full bg-gray-100 p-4 flex items-center justify-center">
                        <FaSpinner className="animate-spin text-xl" />
                    </div>
                )}
            </form>
        </div>
    );
};
