'use client';

interface ImageLightboxProps {
    imageUrl: string | null;
    onClose: () => void;
}

const ImageLightbox = ({ imageUrl, onClose }: ImageLightboxProps) => {
    if (!imageUrl) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-[90vh]">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-blue-400 transition cursor-pointer"
                    aria-label="Cerrar imagen ampliada"
                >
                    &times; Cerrar
                </button>
                <img
                    src={imageUrl}
                    alt="Trabajo ampliado"
                    className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
                />
            </div>
        </div>
    );
};

export default ImageLightbox;
