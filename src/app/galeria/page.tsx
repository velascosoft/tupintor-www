'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface GalleryItem {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
}

const STORAGE_KEY = 'tupintor_gallery_items';

export default function GalleryPage() {
    const [filter, setFilter] = useState('Todos');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fotos, setFotos] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setFotos(JSON.parse(saved));
            } catch (e) {
                console.error('Error al leer la galería:', e);
            }
        }
    }, []);

    const categorias = ['Todos', 'Interior', 'Exterior', 'Pisos', 'Airless', 'Fachada'];

    const fotosFiltradas = filter === 'Todos'
        ? fotos
        : fotos.filter(f => f.category === filter);

    return (
        <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Botón Volver al inicio estilizado */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow-md border border-gray-200 text-xs sm:text-sm transition-all hover:-translate-x-0.5"
                    >
                        <i className="fa-solid fa-arrow-left text-xs"></i>
                        Volver al inicio
                    </Link>
                </div>

                {/* Header de la Galería */}
                <div className="text-center mb-8">
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-1.5">
                        Portafolio Completo
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
                        Galería de Obras Realizadas
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                        Explorá nuestro portafolio completo de proyectos y terminaciones en obras residenciales y comerciales.
                    </p>
                </div>

                {/* Filtros por categoría */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categorias.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                                filter === cat
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grilla de Fotos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {fotosFiltradas.map((foto) => (
                        <div
                            key={foto.id}
                            onClick={() => setSelectedImage(foto.imageUrl)}
                            className="group relative overflow-hidden rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer h-56 md:h-64 bg-gray-100 border border-gray-200/60"
                        >
                            <img
                                src={foto.imageUrl}
                                alt={foto.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">
                                    {foto.category}
                                </span>
                                <h3 className="text-sm font-bold leading-tight">{foto.title}</h3>
                                <span className="text-xs text-gray-200 mt-2 flex items-center gap-1 font-medium">
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
                            className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-blue-400 transition cursor-pointer"
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
        </main>
    );
}