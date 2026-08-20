'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

interface GalleryFormProps {
    onSubmit: (item: {
        title: string;
        category: string;
        imageUrl: string;
        isFeatured: boolean;
    }) => void;
}

const GalleryForm = ({ onSubmit }: GalleryFormProps) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Interior');
    const [isFeatured, setIsFeatured] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title || !imagePreview) {
            alert('Por favor completá el título y selecciona una imagen.');
            return;
        }

        onSubmit({ title, category, imageUrl: imagePreview, isFeatured });
        setTitle('');
        setCategory('Interior');
        setIsFeatured(false);
        setImagePreview(null);
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h2 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">
                Subir nueva imagen
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Título del trabajo
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Ej: Pintura de Durlock y Luces LED"
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Categoría
                    </label>
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                    >
                        <option value="Interior">Interior</option>
                        <option value="Exterior">Exterior</option>
                        <option value="Pisos">Pisos</option>
                        <option value="Airless">Airless</option>
                        <option value="Fachada">Fachada</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 pt-1">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        checked={isFeatured}
                        onChange={(event) => setIsFeatured(event.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700 cursor-pointer">
                        ⭐ Destacar en la Landing Page (Portada)
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Seleccionar Imagen
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                    />
                </div>
                {imagePreview && (
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
                        <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-2 cursor-pointer"
                >
                    Guardar en Galería
                </button>
            </form>
        </div>
    );
};

export default GalleryForm;
