'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface GalleryItem {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    isFeatured: boolean;
}

const STORAGE_KEY = 'tupintor_gallery_items';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState<boolean>(false);

    // Estados del formulario
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Interior');
    const [isFeatured, setIsFeatured] = useState(false); // <-- Estado para el checkbox
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Estado de la lista de trabajos
    const [items, setItems] = useState<GalleryItem[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Error al leer la galería:', e);
                }
            }
        }
        return [
            { id: '1', title: 'Pintura de Fachada en Nueva Córdoba', category: 'Exterior', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=60', isFeatured: true },
            { id: '2', title: 'Renovación de Living Comedor', category: 'Interior', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60', isFeatured: true },
            { id: '3', title: 'Piso de Terraza Epóxico', category: 'Pisos', imageUrl: '/images/techo.jpg', isFeatured: true },
            { id: '4', title: 'Pintura de Fachada Azul', category: 'Fachada', imageUrl: '/images/paredAzul.jpg', isFeatured: true },
        ];
    });

    useEffect(() => {
        const logged = localStorage.getItem('isAdminLogged');
        if (!logged) {
            router.push('/login');
        } else {
            setIsAuth(true);
        }
    }, [router]);

    useEffect(() => {
        if (isAuth) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isAuth]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLogged');
        router.push('/login');
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title || !imagePreview) {
            alert('Por favor completá el título y selecciona una imagen.');
            return;
        }

        const newItem: GalleryItem = {
            id: Date.now().toString(),
            title,
            category,
            imageUrl: imagePreview,
            isFeatured,
        };

        setItems([newItem, ...items]);

        // Limpiar formulario
        setTitle('');
        setCategory('Interior');
        setIsFeatured(false);
        setImagePreview(null);
        alert('¡Imagen agregada correctamente a la galería!');
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Estás seguro de eliminar esta imagen?')) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    // Función para alternar el estado "Destacado" de un trabajo existente
    const toggleFeatured = (id: string) => {
        setItems(items.map(item => {
            if (item.id === id) {
                // Verificar límite de 4 destacados
                const featuredCount = items.filter(i => i.isFeatured && i.id !== id).length;
                if (!item.isFeatured && featuredCount >= 4) {
                    alert('Atención: Solo podés seleccionar hasta 4 fotos para la portada.');
                    return item;
                }
                return { ...item, isFeatured: !item.isFeatured };
            }
            return item;
        }));
    };

    if (!isAuth) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                
                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Panel de Control Tu Pintor CBA
                        </h1>
                        <p className="text-sm text-gray-500">Gestión de Galería de Trabajos</p>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors self-start sm:self-auto cursor-pointer"
                    >
                        Cerrar Sesión
                    </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Tarjeta Formulario */}
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
                                    onChange={(e) => setTitle(e.target.value)}
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
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                                >
                                    <option value="Interior">Interior</option>
                                    <option value="Exterior">Exterior</option>
                                    <option value="Pisos">Pisos</option>
                                    <option value="Airless">Airless</option>
                                    <option value="Fachada">Fachada</option>
                                </select>
                            </div>

                            {/* Checkbox de Destacado */}
                            <div className="flex items-center gap-2 pt-1">
                                <input 
                                    type="checkbox"
                                    id="isFeatured"
                                    checked={isFeatured}
                                    onChange={(e) => setIsFeatured(e.target.checked)}
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

                            {/* Previsualización */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
                                    <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
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

                    {/* Tarjeta Lista: Trabajos Actuales */}
                    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
                        <h2 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2 flex justify-between items-center">
                            <span>Lista de trabajos ({items.length})</span>
                            <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                ⭐ {items.filter(i => i.isFeatured).length}/4 destacados
                            </span>
                        </h2>

                        {items.length === 0 ? (
                            <p className="text-gray-500 text-sm">No hay imágenes en la galería.</p>
                        ) : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                                {items.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="flex items-center justify-between p-3 border border-gray-100 bg-slate-50 rounded-xl gap-3"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.title} 
                                                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold text-slate-900 truncate">
                                                    {item.title}
                                                </h3>
                                                <span className="inline-block bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium mt-1">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {/* Botón para alternar Destacado */}
                                            <button
                                                type="button"
                                                onClick={() => toggleFeatured(item.id)}
                                                className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                                                    item.isFeatured
                                                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                }`}
                                            >
                                                {item.isFeatured ? '⭐ Destacado' : '☆ Destacar'}
                                            </button>

                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}