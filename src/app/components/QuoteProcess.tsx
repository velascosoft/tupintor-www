const QuoteProcess = () => {
    const pasos = [
        {
            number: "01",
            icon: "fa-comments",
            title: "Nos contás zona y tipo de trabajo",
            desc: "Contactanos y contanos qué necesitás: casa, departamento, local, fachada, finalización de contrato o impermeabilización."
        },
        {
            number: "02",
            icon: "fa-camera",
            title: "Enviás fotos o video si ayuda",
            desc: "Una imagen del estado actual permite orientar mejor el alcance y evitar presupuestos a ciegas."
        },
        {
            number: "03",
            icon: "fa-calendar-check",
            title: "Coordinamos el próximo paso",
            desc: "Te orientamos con alcance, tiempos y condiciones para avanzar de forma clara y coordinada."
        }
    ];

    return (
        <section className="py-14 md:py-20 bg-[#FBF9F5] px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado limpio y proporcionado */}
                <div className="text-center mb-10 md:mb-12">
                    <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-1.5">
                        Cotización
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-brand-dark tracking-tight mb-3">
                        Cómo pedir presupuesto
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Para presupuestar bien necesitamos saber zona, tipo de trabajo, estado de paredes, metros aproximados, altura y si incluye materiales.
                    </p>
                </div>

                {/* Grilla de 3 Pasos con numeración y diseño compacto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {pasos.map((paso, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl border border-gray-200/70 shadow-xs hover:shadow-md transition-all duration-200 text-center flex flex-col items-center justify-start group relative"
                        >
                            {/* Insignia con el Número de Paso + Ícono */}
                            <div className="w-11 h-11 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mb-4 font-bold text-sm border border-blue-100 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                                {paso.number}
                            </div>

                            <h3 className="text-base md:text-lg font-bold text-brand-dark mb-2 leading-snug">
                                {paso.title}
                            </h3>

                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-normal">
                                {paso.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default QuoteProcess;