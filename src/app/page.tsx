'use client'

import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import Gallery from "@/app/components/Gallery";
import WhyUs from "@/app/components/WhyUs";
import QuoteProcess from "@/app/components/QuoteProcess";
import MoreWorks from "@/app/components/MoreWorks";
import LocationMap from "@/app/components/LocationMap";
import PricingInfo from "@/app/components/PricingInfo";

const App = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <Hero />
            <Services />
            <Gallery />
            <WhyUs />
            <PricingInfo />
            <QuoteProcess />
            <LocationMap />
            <MoreWorks />
        </div>
    )
}

export default App;