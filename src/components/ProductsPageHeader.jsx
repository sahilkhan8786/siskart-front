import React, { useContext, useEffect, useState } from 'react';
import { getProductHeader } from '../../utils/https';
import { Link } from 'react-router-dom';
import { ProductsPageViewContext } from '../context/ProductsPageViewContext';

const ProductsPageHeader = () => {
    const [hoveredTitle, setHoveredTitle] = useState(null);
    const [header, setHeader] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const [clickedTitle, setClickedTitle] = useState(null); // Track the clicked title
    const { setIsShowingSidebar } = useContext(ProductsPageViewContext)

    const handleMouseEnter = (title) => {
        if (!clickedTitle) { // Only set hovered title if not clicked
            setHoveredTitle(title);
            setIsHovering(true);
        }
    };

    const handleMouseLeave = () => {
        if (!clickedTitle) { // Only set hovering to false if not clicked
            setIsHovering(false);
        }
    };

    const handleSubheaderMouseEnter = () => {
        setIsHovering(true);
    };

    const handleTitleClick = (title) => {
        // Toggle title click logic
        setClickedTitle(prev => (prev === title ? null : title));
        setHoveredTitle(title); // Set hovered title on click
    };

    const handleSubtitleClick = () => {
        // Reset titles when clicking a subtitle
        setClickedTitle(null);
        setHoveredTitle(null);
    };
    const handleSubtitleClickMobile = () => {
        // Reset titles when clicking a subtitle
        setIsShowingSidebar(false)
        setClickedTitle(null);
        setHoveredTitle(null);
    };

    useEffect(() => {
        const result = async () => {
            const data = await getProductHeader('productsHeader');

            const filtered = data?.headerData.filter(titles => titles.title !== '');

            const sortedData = filtered
                .sort((a, b) => a.sequence - b.sequence)
                .map(header => ({
                    ...header,
                    subHeader: header.subHeader.sort((a, b) => a.subTitleSequence - b.subTitleSequence)
                }));
            setHeader(sortedData);
        };
        result();
    }, []);

    useEffect(() => {
        if (!isHovering && hoveredTitle && !clickedTitle) { // Only timeout if not clicked
            const timer = setTimeout(() => {
                setHoveredTitle(null);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isHovering, hoveredTitle, clickedTitle]); // Add clickedTitle as a dependency

    return (
        // FOR DESKTOP
        <>
            <div className="hidden xl:block bg-gray-100 p-4 z-50 relative min-">
                {/* Titles Column */}
                <div className="flex flex-col gap-4 overflow-y-scroll ">
                    {header.map((header) => (
                        <div
                            key={header._id}
                            className="bg-white p-2 hover:bg-blue-500 hover:text-white cursor-pointer "
                            onMouseEnter={() => handleMouseEnter(header.title)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleTitleClick(header.title)} // Handle title click
                        >
                            <h3>{header.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Subtitles Column */}
                <div
                    className="absolute top-0 left-[100%] z-50"
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleSubheaderMouseEnter}
                >
                    {hoveredTitle && (
                        <ul className="w-full bg-gray-100 p-2 flex flex-col gap-2 overflow-y-scroll   xl:h-[750px]">
                            {header
                                .find(header => header.title === hoveredTitle)
                                ?.subHeader.map((sub) => (
                                    <Link
                                        to={`/products?ItemSubGroup=${sub.subTitle}`}
                                        key={sub._id}
                                        onClick={handleSubtitleClick} // Handle subtitle click
                                    >
                                        <li className='whitespace-nowrap bg-white p-2 hover:bg-blue-500 hover:text-white cursor-pointer'>
                                            {sub.subTitle}
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    )}
                </div>
            </div>

            {/* FOR MOBILE */}
            <div className="block xl:hidden bg-gray-100 p-4 z-50 absolute w-full     h-[600px] pb-12 ">
                {/* Titles Column */}
                <div className="flex flex-col gap-2 h-full overflow-y-scroll pb-12">
                    {header.map((headerItem) => (
                        <div key={headerItem._id} className="bg-white p-2 cursor-pointer">
                            {/* Title Section */}
                            <div
                                className="hover:bg-blue-500 hover:text-white"
                                onMouseEnter={() => handleMouseEnter(headerItem.title)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleTitleClick(headerItem.title)} // Handle title click
                            >
                                <h3>{headerItem.title}</h3>
                            </div>

                            {/* Subtitles below the clicked title */}
                            {clickedTitle === headerItem.title && (
                                <ul className="bg-gray-100 p-2 flex flex-col gap-2 mt-2">
                                    {headerItem.subHeader.map((sub) => (
                                        <Link
                                            to={`/products?ItemSubGroup=${sub.subTitle}`}
                                            key={sub._id}
                                            onClick={handleSubtitleClickMobile} // Handle subtitle click
                                        >
                                            <li className='whitespace-nowrap bg-white p-2 hover:bg-blue-500 hover:text-white cursor-pointer'>
                                                {sub.subTitle}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default ProductsPageHeader;
