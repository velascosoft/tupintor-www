'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent, useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const sectionLinks = [
        { href: '/#servicios', label: 'Servicios' },
        { href: '/#trabajos', label: 'Trabajos' },
        { href: '/#por-que-elegirnos', label: 'Por qué elegirnos' },
        { href: '/#contacto', label: 'Contacto' }
    ];

    const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">

                {/* Logo / Marca - Tamaño de texto más proporcionado */}
                <Link
                    href="/"
                    onClick={handleLogoClick}
                    className="flex items-center gap-2 md:gap-2.5 group"
                    aria-label="Ir al inicio"
                >
                    <img
                        src="/images/logo-tupintor.png"
                        alt="Logo TuPintor"
                        className="h-9 md:h-10 w-auto rounded-full shadow-inner transition-transform duration-200 group-hover:scale-105"
                    />

                    <span className="text-lg md:text-xl font-extrabold text-brand-dark tracking-tight transition-colors duration-200 group-hover:text-brand-blue">
                        TuPintor
                    </span>
                </Link>

                {/* Links de navegación escritorio - Letras más estilizadas (text-sm a text-base) */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold text-gray-700 text-sm xl:text-base">
                    {sectionLinks.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-brand-blue transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </nav>

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
                    {sectionLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-brand-blue py-1"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Navbar;