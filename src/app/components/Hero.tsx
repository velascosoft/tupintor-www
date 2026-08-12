
const Hero = () => {
    const phone = "+5493518500253";
    const whatsappUrl = `https://wa.me/${phone}?text=Hola,%20quisiera%20enviar%20fotos%20para%20un%20presupuesto`;

    const serviciosClave = [
        "Interior y Exterior",
        "Sistema Airless",
        "Renovación de Pisos",
        "Impermeabilización",
        "Mantenimiento Gral.",
        "Barnices Sintéticos"
    ];

    return (
        <section
            className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4 bg-cover bg-center text-white min-h-[80vh] flex items-center justify-center"
            style={{ backgroundImage: `url(/images/estructuraExterior.jpg)` }}
        >
            {/* Overlay más estilizado */}
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>

            <div className="relative max-w-4xl mx-auto text-center z-10">

                {/* Badge Superior */}
                <span className="inline-block bg-brand-blue/20 text-blue-300 text-xs font-semibold px-3.5 py-1 rounded-full border border-brand-blue/30 uppercase tracking-wider mb-4">
                    Servicios Profesionales de Pintura
                </span>

                {/* Título Principal Refinado (Menos agresivo) */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 leading-tight tracking-tight text-white">
                    Pintores Profesionales en tu Ciudad
                </h1>

                {/* Bajada/Subtítulo */}
                <p className="text-sm sm:text-lg text-gray-200 mb-6 max-w-2xl mx-auto font-normal leading-relaxed">
                    Especialistas en interiores, exteriores, impermeabilizaciones y aplicación con tecnología Airless. Pedí tu presupuesto sin compromiso.
                </p>

                {/* Chips/Píldoras de Servicios (Sustituyen a las cajas pesadas) */}
                <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-8">
                    {serviciosClave.map((servicio, index) => (
                        <span 
                            key={index} 
                            className="bg-white/10 backdrop-blur-md text-gray-100 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-white/15 shadow-sm"
                        >
                            ✓ {servicio}
                        </span>
                    ))}
                </div>

                {/* Botones de Acción Principales */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                    <a
                        href={`tel:+${phone}`}
                        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-5 py-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 text-sm sm:text-base"
                    >
                        <i className="fa-solid fa-phone text-base"></i>
                        Pedir cotización por teléfono
                    </a>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-white/95 hover:bg-white text-slate-900 font-semibold px-5 py-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 text-sm sm:text-base"
                    >
                        <i className="fa-brands fa-whatsapp text-lg text-green-600"></i>
                        Enviar fotos por WhatsApp
                    </a>
                </div>

            </div>
        </section>
    );
}

export default Hero;