const PricingInfo = () => {
    const phone = "+5493518500253";

    const factoresVariacion = [
        "Estado de las superficies",
        "Cantidad de manos requeridas",
        "Trabajos de reparación previos",
        "Altura y dificultad de acceso",
        "Preparación y lijado previo",
        "Tipo de pintura utilizada"
    ];

    return (
        <section className="py-14 md:py-20 bg-slate-50/60 px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Columna Izquierda: Introducción refinada */}
                    <div className="lg:col-span-5 flex flex-col items-start">
                        <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-1.5">
                            Valores de Referencia
                        </span>
                        <h2 className="text-2xl md:text-4xl font-bold text-brand-dark tracking-tight mb-4">
                            Precio de Pintura por m² en Córdoba
                        </h2>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-3">
                            El precio de pintura por m² en Córdoba puede variar según el tipo de superficie, altura, estado de las paredes y el sistema de terminación utilizado.
                        </p>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-3">
                            En <strong className="text-gray-700">Tu Pintor CBA</strong> desarrollamos presupuestos personalizados para viviendas, edificios, comercios e industrias en Córdoba Capital y zonas aledañas.
                        </p>

                        {/* Texto de confianza y calidad agregado */}
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                            Trabajamos exclusivamente con <strong className="text-gray-700">materiales de primera calidad</strong> e insumos de marcas líderes, garantizando terminaciones duraderas, prolijidad en cada detalle y el máximo cuidado de tus ambientes.
                        </p>

                        <a
                            href={`https://wa.me/${phone}?text=Hola,%20quisiera%20consultar%20un%20presupuesto%20por%20m2`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-full shadow-xs transition-all duration-200 text-xs sm:text-sm"
                        >
                            <i className="fa-brands fa-whatsapp text-green-400 text-base"></i>
                            <span>Consultar presupuesto por m²</span>
                        </a>
                    </div>

                    {/* Columna Derecha: Tarjetas contenedoras limpias */}
                    <div className="lg:col-span-7 space-y-4">

                        {/* Tarjeta 1: Pintura Interior y Exterior */}
                        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-100">
                                <h3 className="text-base md:text-lg font-bold text-brand-dark">
                                    Pintura Interior y Exterior
                                </h3>
                                <span className="inline-block bg-blue-50 text-brand-blue font-extrabold text-xs sm:text-sm px-3 py-1 rounded-full border border-blue-100/80">
                                    Desde $9.000 / m²
                                </span>
                            </div>

                            <p className="text-gray-500 text-xs sm:text-sm mb-3 font-medium">
                                Factores que pueden hacer variar el valor final:
                            </p>

                            {/* Grilla de factores con tildes */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                                {factoresVariacion.map((factor, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <span className="text-brand-blue font-bold text-xs">✓</span>
                                        <span>{factor}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tarjeta 2: Revestimiento Plástico */}
                        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h3 className="text-base md:text-lg font-bold text-brand-dark mb-1">
                                    Revestimiento Plástico (Texturado)
                                </h3>
                                <p className="text-gray-500 text-xs leading-relaxed max-w-md">
                                    Aplicación de material tipo Tarquini / Revear con llana o rodillo en exteriores e interiores.
                                </p>
                            </div>
                            <span className="inline-block bg-blue-50 text-brand-blue font-extrabold text-xs sm:text-sm px-3 py-1 rounded-full border border-blue-100/80 whitespace-nowrap self-start sm:self-center">
                                Desde $21.000 / m²
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default PricingInfo;