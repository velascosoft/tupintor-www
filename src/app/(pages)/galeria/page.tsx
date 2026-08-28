'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import GalleryGrid from '@/app/components/gallery/GalleryGrid';
import ImageLightbox from '@/app/components/gallery/ImageLightbox';
import {
    GALLERY_CATEGORIES,
    GalleryCategory,
} from '@/app/components/gallery/types';
import { useListGalleryImages } from '@/app/hooks/useGallery';
import { capitalize } from '@/app/utils/stringUtils';

const GalleryPage = () => {
    const [filter, setFilter] = useState<GalleryCategory>('Todos');
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

    const filteredItems = filter === 'Todos' ? items : items.filter((item) => capitalize(item.category) === filter);

    return (
        <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow-md border border-gray-200 text-xs sm:text-sm transition-all hover:-translate-x-0.5"
                    >
                        <i className="fa-solid fa-arrow-left text-xs" />
                        Volver al inicio
                    </Link>
                </div>

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

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {GALLERY_CATEGORIES.map((category) => (
                        <button
                            type="button"
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer ${filter === category
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <GalleryGrid items={filteredItems} onSelect={setSelectedImage} />
            </div>

            <ImageLightbox
                imageUrl={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </main>
    );
};

export default GalleryPage;
