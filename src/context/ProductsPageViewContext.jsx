import { createContext, useEffect, useState } from "react";

export const ProductsPageViewContext = createContext();

export const ProductsPageViewContextProvider = ({ children }) => {
    const [isShowingSidebar, setIsShowingSidebar] = useState(window.innerWidth > 1024);
    function handleResize(e) {
        if (window.innerWidth < 1024) {
            setIsShowingSidebar(false)
        } else {
            setIsShowingSidebar(true)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <ProductsPageViewContext.Provider value={{ setIsShowingSidebar, isShowingSidebar }}>
            {children}
        </ProductsPageViewContext.Provider>
    )
};