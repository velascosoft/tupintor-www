'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GalleryForm from '@/app/components/admin/GalleryForm';
import GalleryList from '@/app/components/admin/GalleryList';
import {
    DEFAULT_GALLERY_ITEMS,
    readGalleryItems,
    saveGalleryItems,
} from '@/app/components/gallery/storage';
import { GalleryItem } from '@/app/components/gallery/types';
import PriceSettingsForm from '@/app/components/PriceSettingsForm';

const AdminDashboard = () => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [items, setItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        if (!localStorage.getItem('isAdminLogged')) {
            router.push('/login');
            return;
        }

        setIsAuth(true);
        setItems(readGalleryItems(DEFAULT_GALLERY_ITEMS));
    }, [router]);

    useEffect(() => {
        if (isAuth) {
            saveGalleryItems(items);
        }
    }, [items, isAuth]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLogged');
        router.push('/login');
    };

    const handleAdd = (item: Omit<GalleryItem, 'id'>) => {
        setItems((currentItems) => [
            { ...item, id: Date.now().toString() },
            ...currentItems,
        ]);
        alert('¡Imagen agregada correctamente a la galería!');
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Estás seguro de eliminar esta imagen?')) {
            setItems((currentItems) => currentItems.filter((item) => item.id !== id));
        }
    };

    const handleToggleFeatured = (id: string) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                const featuredCount = currentItems.filter(
                    (currentItem) => currentItem.isFeatured && currentItem.id !== id,
                ).length;

                if (!item.isFeatured && featuredCount >= 4) {
                    alert('Atención: Solo podés seleccionar hasta 4 fotos para la portada.');
                    return item;
                }

                return { ...item, isFeatured: !item.isFeatured };
            }),
        );
    };

    if (!isAuth) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Panel de Control Tu Pintor CBA
                        </h1>
                        <p className="text-sm text-gray-500">Gestión de Galería de Trabajos</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors self-start sm:self-auto cursor-pointer"
                    >
                        Cerrar Sesión
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Formulario toma 5 columnas de 12. Columna izquierda*/}
                    <div className="lg:col-span-5 space-y-6">
                        <GalleryForm onSubmit={handleAdd} />
                        <PriceSettingsForm />
                    </div>

                    {/* Lista toma 7 columnas de 12. columna Derecha*/}
                    <div className="lg:col-span-7">
                        <GalleryList
                            items={items}
                            onDelete={handleDelete}
                            onToggleFeatured={handleToggleFeatured}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
