import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import WhyUs from './components/WhyUs';
import QuoteProcess from './components/QuoteProcess';
import MoreWorks from './components/MoreWorks';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Nueva vista
import GalleryPage from './pages/GalleryPage';
import LocationMap from './components/LocationMap';
import PricingInfo from './components/PricingInfo';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <WhyUs />
        <PricingInfo />
        <QuoteProcess />
        <LocationMap/>
        <MoreWorks />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}