import React, { useEffect, useState } from 'react';
import { getProductHeader } from '../../utils/https';
import { Link } from 'react-router-dom';

const ProductsPageHeader = () => {
    const [hoveredTitle, setHoveredTitle] = useState(null);
    const [header, setHeader] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const [clickedTitle, setClickedTitle] = useState(null); // Track the clicked title

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

    useEffect(() => {
        const result = async () => {
            const data = await getProductHeader('productsHeader');
            console.log(data?.headerData);

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
        <div className="bg-gray-100 p-4 z-50 relative">
            {/* Titles Column */}
            <div className="flex flex-col gap-4">
                {header.map((header) => (
                    <div
                        key={header._id}
                        className="bg-white p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
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
                    <ul className="w-full bg-gray-100 p-2 flex flex-col gap-2 overflow-y-scroll h-[750px]">
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
    );
};

export default ProductsPageHeader;
