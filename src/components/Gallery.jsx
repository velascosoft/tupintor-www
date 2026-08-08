import { useState } from 'react';

// Importamos tus imágenes desde src/assets/images
// ¡Asegurate de ajustar los nombres de archivo a los que le pusiste!
import img1 from '../assets/images/exteriorBlanco2.jpg';
import img2 from '../assets/images/interiorNaranja.jpg';
import img3 from '../assets/images/habitacionBlanca.jpg';
import img4 from '../assets/images/paredAzul.jpg';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    const trabajos = [
        { src: img1, title: "Pintura de Exterior", category: "Exterior" },
        { src: img2, title: "Living y Comedor", category: "Interior" },
        { src: img3, title: "Habitacion", category: "Habitacion" },
        { src: img4, title: "Fachada", category: "Fachada" },
    ];

    return (
        <section id="trabajos" className="py-20 bg-white px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado */}
                <div className="text-center mb-12">
                    <span className="text-brand-blue font-bold text-sm uppercase tracking-wider">
                        Galería de Proyectos
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-brand-dark mt-2 mb-4">
                        Nuestros Trabajos Realizados
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Mirá los acabados y resultados reales en obras residenciales y comerciales.
                    </p>
                </div>

                {/* Grilla de Imágenes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trabajos.map((trabajo, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(trabajo.src)}
                            className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-72 bg-gray-100 border border-gray-100"
                        >
                            {/* Imagen */}
                            <img
                                src={trabajo.src}
                                alt={trabajo.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Sombra / Overlay al pasar el mouse */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                                <span className="text-xs font-semibold text-brand-blue uppercase tracking-widest mb-1">
                                    {trabajo.category}
                                </span>
                                <h3 className="text-lg font-bold">{trabajo.title}</h3>
                                <span className="text-xs text-gray-300 mt-2 flex items-center gap-1">
                                    <i className="fa-solid fa-magnifying-glass-plus"></i> Ver foto en grande
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* Modal Lightbox para ver la foto ampliada */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-brand-blue transition cursor-pointer"
                        >
                            &times; Cerrar
                        </button>
                        <img
                            src={selectedImage}
                            alt="Trabajo ampliado"
                            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}