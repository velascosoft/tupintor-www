import QuoteCalculator from './QuoteCalculator';

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
                    {/* Columna Derecha: Calculador Interactivo */}
                    <div className="lg:col-span-7">
                        <QuoteCalculator />
                    </div>

                </div>

            </div>
        </section>
    );
}

export default PricingInfo;