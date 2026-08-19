'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface GalleryItem {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    isFeatured?: boolean;
}

const STORAGE_KEY = 'tupintor_gallery_items';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [trabajos, setTrabajos] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setTrabajos(JSON.parse(saved));
            } catch (e) {
                console.error('Error al leer la galería:', e);
            }
        }
    }, []);

    // 1. Filtramos sólo las fotos marcadas como 'isFeatured' (máximo 4)
    const featuredTrabajos = trabajos.filter(t => t.isFeatured).slice(0, 4);

    return (
        <section id="trabajos" className="py-20 bg-white px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                        Galería de Proyectos
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2 mb-4">
                        Nuestra Galería de Trabajos Realizados
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Explorá nuestro portafolio destacado de proyectos y terminaciones.
                    </p>
                </div>

                {/* Grilla con fotos destacadas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredTrabajos.map((trabajo) => (
                        <div
                            key={trabajo.id}
                            onClick={() => setSelectedImage(trabajo.imageUrl)}
                            className="group relative overflow-hidden rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer h-72 bg-gray-100 border border-gray-100"
                        >
                            <img
                                src={trabajo.imageUrl}
                                alt={trabajo.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                                <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">
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

                {/* Botón hacia el portafolio completo */}
                <div className="flex justify-center mt-10">
                    <Link
                        href="/galeria"
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Ver todas las fotos del portafolio
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                </div>

            </div>

            {/* Modal para ver imagen ampliada */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-blue-400 transition cursor-pointer"
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
};

export default Gallery;