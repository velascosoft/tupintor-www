'use client';

interface GalleryGridProps {
    items: Array<{
        id: string;
        url: string;
        title: string;
        category: string;
    }>;
    onSelect: (imageUrl: string) => void;
    compact?: boolean;
}

const GalleryGrid = ({ items, onSelect, compact = false }: GalleryGridProps) => (
    <div
        className={
            compact
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'
        }
    >
        {items.map((item) => (
            <button
                type="button"
                key={item.id}
                onClick={() => onSelect(item.url)}
                className={`group relative overflow-hidden rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer h-56 md:h-64 bg-gray-100 border border-gray-200/60 text-left ${
                    compact ? 'h-72 border-gray-100' : ''
                }`}
            >
                <img
                    src={item.url}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                        compact ? 'group-hover:scale-110' : 'group-hover:scale-105'
                    }`}
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">
                        {item.category}
                    </span>
                    <span className="text-sm font-bold leading-tight">{item.title}</span>
                    <span className="text-xs text-gray-200 mt-2 flex items-center gap-1 font-medium">
                        <i className="fa-solid fa-magnifying-glass-plus text-xs" /> Ampliar
                    </span>
                </div>
            </button>
        ))}
    </div>
);

export default GalleryGrid;
