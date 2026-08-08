import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-tupintor.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const phone = "+5493518500253";

    const whatsappUrl = `https://wa.me/${phone}?text=Hola,%20quisiera%20pedir%20un%20presupuesto`;

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">

                {/* Logo / Marca - Tamaño de texto más proporcionado */}
                <Link
                    to="/"
                    onClick={handleLogoClick}
                    className="flex items-center gap-2 md:gap-2.5 group"
                    aria-label="Ir al inicio"
                >
                    <img
                        src={logo}
                        alt="Logo TuPintor"
                        className="h-9 md:h-10 w-auto rounded-full shadow-inner transition-transform duration-200 group-hover:scale-105"
                    />

                    <span className="text-lg md:text-xl font-extrabold text-brand-dark tracking-tight transition-colors duration-200 group-hover:text-brand-blue">
                        TuPintor
                    </span>
                </Link>

                {/* Links de navegación escritorio - Letras más estilizadas (text-sm a text-base) */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold text-gray-700 text-sm xl:text-base">
                    <a href="/#servicios" className="hover:text-brand-blue transition-colors">Servicios</a>
                    <a href="/#trabajos" className="hover:text-brand-blue transition-colors">Trabajos</a>
                    <a href="/#por-que-elegirnos" className="hover:text-brand-blue transition-colors">Por qué elegirnos</a>
                    <a href="/#contacto" className="hover:text-brand-blue transition-colors">Contacto</a>
                </nav>

                {/* Botones de acción escritorio */}
                <div className="hidden sm:flex items-center gap-3">
                    <a
                        href={`tel:+${phone}`}
                        className="hidden xl:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-1.5 rounded-full font-semibold text-xs xl:text-sm transition-colors"
                    >
                        <i className="fa-solid fa-phone text-xs"></i>
                        Llamar
                    </a>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold transition flex items-center gap-2 text-xs xl:text-sm shadow-sm hover:shadow"
                    >
                        <i className="fa-brands fa-whatsapp text-base"></i>
                        <span>Presupuesto</span>
                    </a>

                    <a
                        href="https://www.instagram.com/tupintor7/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Síguenos en Istagram"
                        className="hidden sm:flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-full shadow-sm hover:opacity-90 transition-all hover:scale-105"
                    >
                        <i className="fa-brands fa-instagram text-lg"></i>
                    </a>

                </div>

                {/* Botón Hamburguesa */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-gray-800 focus:outline-none p-2 text-xl"
                    aria-label="Abrir menú"
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                </button>

            </div>

            {/* Menú Desplegable Móvil */}
            {isOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 px-6 pt-4 pb-6 shadow-xl flex flex-col gap-3 font-semibold text-gray-800 text-base">
                    <a href="/#servicios" onClick={() => setIsOpen(false)} className="hover:text-brand-blue py-1">Servicios</a>
                    <a href="/#trabajos" onClick={() => setIsOpen(false)} className="hover:text-brand-blue py-1">Trabajos</a>
                    <a href="/#por-que-elegirnos" onClick={() => setIsOpen(false)} className="hover:text-brand-blue py-1">Por qué elegirnos</a>
                    <a href="/#contacto" onClick={() => setIsOpen(false)} className="hover:text-brand-blue py-1">Contacto</a>
                    <div className="pt-2 flex flex-col gap-2">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white text-center py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                        >
                            <i className="fa-brands fa-whatsapp text-lg"></i>
                            Pedir Presupuesto por WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}