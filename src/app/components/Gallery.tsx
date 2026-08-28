'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import GalleryGrid from '@/app/components/gallery/GalleryGrid';
import ImageLightbox from '@/app/components/gallery/ImageLightbox';
import { useListGalleryImages } from '../hooks/useGallery';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [items, setItems] = useState<Array<{
        id: string;
        url: string;
        title: string;
        category: string;
    }>>([]);

    const { data } = useListGalleryImages();

    useEffect(() => {
        setItems(data || []);
    }, [data]);

    const featuredTrabajos = items.filter(t => true).slice(0, 4);

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
                <GalleryGrid
                    items={featuredTrabajos}
                    onSelect={setSelectedImage}
                    compact
                />

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
            <ImageLightbox
                imageUrl={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </section>
    );
};

export default Gallery;