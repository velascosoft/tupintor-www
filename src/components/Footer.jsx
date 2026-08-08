import logo from '../assets/logo-tupintor.png';

export default function Footer() {
    const phone = "3804750587";

    return (
        <footer id="contacto" className="bg-brand-dark text-gray-300 pt-12 pb-8 px-4 border-t border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-800/80">

                {/* Columna 1: Marca y descripción */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2.5 mb-3">
                        <img src={logo} alt="Logo TuPintor" className="h-9 w-auto rounded-full" />
                        <span className="text-xl font-extrabold text-white tracking-tight">TuPintor</span>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3 max-w-sm">
                        Servicios profesionales de pintura para hogares, comercios e industrias. Garantía de prolijidad, rapidez y atención personalizada.
                    </p>
                </div>

                {/* Columna 2: Enlaces Rápidos (con /# para prevenir errores en /galeria) */}
                <div>
                    <h4 className="text-white font-bold text-base mb-3">Navegación</h4>
                    <ul className="space-y-2 text-xs md:text-sm text-gray-400 font-medium">
                        <li><a href="/#servicios" className="hover:text-brand-blue transition-colors">Nuestros Servicios</a></li>
                        <li><a href="/#trabajos" className="hover:text-brand-blue transition-colors">Galería de Trabajos</a></li>
                        <li><a href="/#por-que-elegirnos" className="hover:text-brand-blue transition-colors">¿Por qué elegirnos?</a></li>
                        <li>
                            <a 
                                href={`https://wa.me/${phone}?text=Hola,%20quisiera%20pedir%20un%20presupuesto`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-brand-blue transition-colors"
                            >
                                Pedir Presupuesto
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Columna 3: Contacto Directo */}
<div>
    <h4 className="text-white font-bold text-base mb-3">Contacto Directo</h4>
    <ul className="space-y-2.5 text-xs md:text-sm text-gray-400">
        <li className="flex items-center gap-2.5">
            <i className="fa-brands fa-whatsapp text-green-500 text-base"></i>
            <span>WhatsApp / Llamadas: <strong className="text-gray-200 font-semibold">{phone}</strong></span>
        </li>
        <li className="flex items-center gap-2.5">
            <i className="fa-solid fa-location-dot text-brand-blue text-base"></i>
            <span>Zona Córdoba: Capital y Alrededores</span>
        </li>
        {/* Nuevo ícono de Instagram */}
        <li className="flex items-center gap-2.5 pt-1">
            <i className="fa-brands fa-instagram text-pink-500 text-base"></i>
            <a 
                href="https://www.instagram.com/tupintor7/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
            >
                Síguenos en Instagram: <strong className="text-gray-200 font-semibold">@tupintor7</strong>
            </a>
        </li>
    </ul>
</div>
                

            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
                <p>&copy; {new Date().getFullYear()} TuPintor. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}