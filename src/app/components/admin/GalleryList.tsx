'use client';

import { useState } from 'react';
import { GalleryItem } from '@/app/components/gallery/types';

interface GalleryListProps {
    items: GalleryItem[];
    onDelete: (id: string) => void;
    onToggleFeatured: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

const GalleryList = ({ items, onDelete, onToggleFeatured }: GalleryListProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Cálculos de paginación
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Ajustar página si al eliminar elementos nos quedamos en una página vacía
    const validPage = currentPage > totalPages && totalPages > 0 ? totalPages : currentPage;
    const displayedItems = currentPage !== validPage ? items.slice((validPage - 1) * ITEMS_PER_PAGE, validPage * ITEMS_PER_PAGE) : paginatedItems;

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h2 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2 flex justify-between items-center">
                <span>Lista de trabajos ({items.length})</span>
                <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    ⭐ {items.filter((item) => item.isFeatured).length}/4 destacados
                </span>
            </h2>

            {items.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay imágenes en la galería.</p>
            ) : (
                <>
                    <div className="space-y-3 pr-1">
                        {displayedItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 bg-slate-50 rounded-xl gap-3">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <img src={item.imageUrl} alt={item.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-slate-900 truncate">{item.title}</h3>
                                        <span className="inline-block bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium mt-1">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => onToggleFeatured(item.id)}
                                        className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                                            item.isFeatured
                                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                    >
                                        {item.isFeatured ? '⭐ Destacado' : '☆ Destacar'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(item.id)}
                                        className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controles de Paginación */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 text-sm text-gray-600">
                            <span>
                                Página {validPage} de {totalPages}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={validPage === 1}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs cursor-pointer"
                                >
                                    Anterior
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={validPage === totalPages}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs cursor-pointer"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GalleryList;