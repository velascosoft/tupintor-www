const WhyUs = () => {
    const razones = [
        {
            icon: "fa-shield-halved",
            title: "Protección y limpieza",
            desc: "Cuidamos pisos, muebles y detalles de terminación para que el trabajo quede prolijo de principio a fin."
        },
        {
            icon: "fa-location-dot",
            title: "Cobertura local",
            desc: "Atendemos trabajos en toda la ciudad y alrededores, para obras residenciales, comerciales y barrios privados."
        },
        {
            icon: "fa-file-invoice-dollar",
            title: "Presupuesto claro",
            desc: "Podés consultar por llamada o WhatsApp. Evaluamos también por fotos para orientar rápido el trabajo y costo."
        },
        {
            icon: "fa-user-check",
            title: "Experiencia real",
            desc: "Especialistas en pintura interior, exterior, fachadas, maderas y aplicación de impermeabilizantes."
        }
    ];

    return (
        <section id="por-que-elegirnos" className="py-14 md:py-20 bg-gray-50/50 px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado limpio y estilizado */}
                <div className="text-center mb-10 md:mb-12">
                    <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-1.5">
                        ¿Por qué elegir TuPintor?
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-brand-dark tracking-tight">
                        Orden, prolijidad y contacto directo
                    </h2>
                </div>

                {/* Grilla de 4 Tarjetas estilizadas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {razones.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 md:p-6 rounded-xl border border-gray-200/70 shadow-xs hover:shadow-md transition-all duration-200 text-center flex flex-col items-center justify-start group"
                        >
                            {/* Ícono sutil para darle entidad */}
                            <div className="w-10 h-10 bg-blue-50 text-brand-blue rounded-lg flex items-center justify-center mb-3 text-base group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                                <i className={`fa-solid ${item.icon}`}></i>
                            </div>

                            <h3 className="text-base font-bold text-brand-dark mb-2 leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-normal">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default WhyUs;