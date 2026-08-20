export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    isFeatured?: boolean;
}

export const GALLERY_CATEGORIES = [
    'Todos',
    'Interior',
    'Exterior',
    'Pisos',
    'Airless',
    'Fachada',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
