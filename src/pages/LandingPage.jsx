import React from 'react'
import LandingHero from '../components/LandingHero'
import LandingProductBox from '../components/LandingProductBox'

const LandingPage = () => {
    return (
        <>
            <LandingHero />
            {/* FOR LAPTOPS */}
            <LandingProductBox
                title={"Best laptops"}
                url={'products?fields=ALIAS,MRP,Brand&ItemGroup=LAPTOP'}
                link={'products?ItemGroup=LAPTOP'}
            />
            <LandingProductBox
                title={"Best laptops"}
                url={'products?fields=ALIAS,MRP,Brand&ItemGroup=LAPTOP'}
                link={'products?ItemGroup=LAPTOP COMPONENTS'}
            />


        </>
    )
}

export default LandingPage