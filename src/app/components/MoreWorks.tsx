import { useState } from 'react';

const MoreWorks = () => {
    const [selectedImage, setSelectedImage] = useState<string|null>(null);

    const fotosExtra = [
        { src: '/images/interior.jpg', alt: "Proyecto de pintura interior" },
        { src: '/images/techo.jpg', alt: "Terminación piso terraza" },
        {src: '/images/interiorPasillo.jpg', alt: "Terminación piso terraza" },
        { src: '/images/FrenteDeCasa.jpg', alt: "Frente de una casa" },
    ];

    return (
        <section className="py-14 md:py-20 bg-white px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">

                {/* Título de la sección armonizado */}
                <div className="text-center mb-8 md:mb-10">
                    <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-1.5">
                        Galería de proyectos
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-brand-dark tracking-tight mb-2">
                        Nuestra galeria de trabajos realizados
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                    Explorá nuestro portafolio completo de proyectos y terminaciones.
                    </p>
                </div>

                {/* Grilla de imágenes en 4 columnas de menor altura */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {fotosExtra.map((foto, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(foto.src)}
                            className="group relative overflow-hidden rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer h-56 md:h-64 bg-gray-100 border border-gray-100"
                        >
                            <img
                                src={foto.src}
                                alt={foto.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Overlay al pasar el cursor */}
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white p-3">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full font-semibold text-xs border border-white/30 flex items-center gap-1.5">
                                    <i className="fa-solid fa-magnifying-glass-plus text-xs"></i> Ampliar
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal / Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-brand-blue transition cursor-pointer"
                        >
                            &times; Cerrar
                        </button>
                        <img
                            src={selectedImage}
                            alt="Trabajo ampliado"
                            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

export default MoreWorks;