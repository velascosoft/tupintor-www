export default function LocationMap() {
    // Dirección exacta codificada para el iframe de Google Maps
    const addressQuery = encodeURIComponent("Pasaje Antonio de la Parra 52, Córdoba, Argentina");
    const mapIframeUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;

    return (
        <section id="ubicacion" className="py-10 md:py-16 bg-[#FBF9F5] px-4 border-t border-gray-200/60">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    
                    {/* Tarjeta Informativa de Ubicación y Calidad */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between h-full">
                        <div>
                            <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-2">
                                Ubicación & Cobertura
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3 tracking-tight">
                                Tu Pintor CBA en Google Maps
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                                Brindamos servicios profesionales con atención en toda la zona. Podés verificar nuestra ubicación de referencia y consultarnos por trabajos residenciales o comerciales.
                            </p>

                            {/* Detalle sobre Materiales de Primera Calidad (Punto 3 del cliente) */}
                            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 mb-4 flex items-start gap-3">
                                <i className="fa-solid fa-award text-brand-blue text-xl mt-0.5"></i>
                                <div>
                                    <h4 className="text-sm font-bold text-brand-dark">Materiales de Primera Calidad</h4>
                                    <p className="text-xs text-gray-600 mt-0.5">
                                        Trabajamos exclusivamente con insumos y pinturas de marcas líderes para garantizar acabados duraderos y de máxima prolijidad.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Datos directos de dirección */}
                        <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-location-dot text-brand-blue text-sm"></i>
                                <span>Pasaje Antonio de la Parra N°52 (Esq. Panamá)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-city text-brand-blue text-sm"></i>
                                <span>Córdoba Capital</span>
                            </div>
                        </div>
                    </div>

                    {/* Mapa interactivo Embed de Google Maps */}
                    <div className="w-full h-80 md:h-[360px] rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs bg-gray-100">
                        <iframe
                            title="Ubicación Tu Pintor CBA"
                            src={mapIframeUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
}