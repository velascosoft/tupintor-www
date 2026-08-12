const Services = () => {
    const phone = "+5493518500253";

    const servicios = [
        {
            icon: "fa-paint-roller",
            title: "Pintura Interior y Exterior",
            description: "Acabados de calidad para casas, departamentos, oficinas y fachadas comerciales."
        },
        {
            icon: "fa-screwdriver-wrench",
            title: "Mantenimiento Gral. de Pintura",
            description: "Retoques, reparación de grietas y acondicionamiento general de superficies."
        },
        {
            icon: "fa-spray-can",
            title: "Aplicación de Sistemas Airless",
            description: "Tecnología de pulverizado a alta presión para acabados uniformes, ultra rápidos y perfectos."
        },
        {
            icon: "fa-brush",
            title: "Barnices Sintéticos",
            description: "Protección, embellecimiento y laqueado para aberturas, decks y estructuras de madera."
        },
        {
            icon: "fa-border-all",
            title: "Pintura y Renovación de Pisos",
            description: "Aplicación de pintura epóxica y recubrimientos de alta resistencia para pisos y garajes."
        },
        {
            icon: "fa-droplet-slash",
            title: "Impermeabilización",
            description: "Tratamiento contra filtraciones, humedad de cimientos y sellado protector de techos y muros."
        }
    ];

    return (
        <section id="servicios" className="py-14 md:py-20 bg-slate-50/60 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado más sutil y limpio */}
                <div className="text-center mb-10 md:mb-12">
                    <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-1.5">
                        Lo que hacemos
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-brand-dark tracking-tight mb-3">
                        Nuestros Servicios
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                        Soluciones profesionales adaptadas a cada tipo de proyecto y superficie.
                    </p>
                </div>

                {/* Grilla estilizada */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {servicios.map((s, index) => {
                        const waUrl = `https://wa.me/${phone}?text=Hola,%20quisiera%20consultar%20por%20el%20servicio%20de%20${encodeURIComponent(s.title)}`;

                        return (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl border border-gray-200/70 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Contenedor de ícono más proporcionado */}
                                    <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-4 text-xl group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200 border border-blue-100">
                                        <i className={`fa-solid ${s.icon}`}></i>
                                    </div>

                                    <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-blue transition-colors">
                                        {s.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                        {s.description}
                                    </p>
                                </div>

                                {/* Enlace directo a WhatsApp */}
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors pt-2"
                                >
                                    <span>Consultar este servicio</span>
                                    <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Services;