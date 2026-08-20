import { GalleryItem } from './types';

export const GALLERY_STORAGE_KEY = 'tupintor_gallery_items';

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
    {
        id: '1',
        title: 'Pintura de Fachada en Nueva Córdoba',
        category: 'Exterior',
        imageUrl:
            'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=60',
        isFeatured: true,
    },
    {
        id: '2',
        title: 'Renovación de Living Comedor',
        category: 'Interior',
        imageUrl:
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60',
        isFeatured: true,
    },
    {
        id: '3',
        title: 'Piso de Terraza Epóxico',
        category: 'Pisos',
        imageUrl: '/images/techo.jpg',
        isFeatured: true,
    },
    {
        id: '4',
        title: 'Pintura de Fachada Azul',
        category: 'Fachada',
        imageUrl: '/images/paredAzul.jpg',
        isFeatured: true,
    },
];

export const readGalleryItems = (fallback: GalleryItem[] = []): GalleryItem[] => {
    const saved = localStorage.getItem(GALLERY_STORAGE_KEY);

    if (!saved) {
        return fallback;
    }

    try {
        return JSON.parse(saved) as GalleryItem[];
    } catch (error) {
        console.error('Error al leer la galería:', error);
        return fallback;
    }
};

export const saveGalleryItems = (items: GalleryItem[]) => {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
};
