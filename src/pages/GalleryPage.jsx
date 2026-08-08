import { useState } from 'react';
import { Link } from 'react-router-dom';

// Importación de tus imágenes
import img1 from '../assets/images/exteriorBlanco2.jpg';
import img2 from '../assets/images/paredDorada.jpg';
import img3 from '../assets/images/techo2.jpg';
import img4 from '../assets/images/Trabajado1.jpg';
import img5 from '../assets/images/Airless.jpg';
import img6 from '../assets/images/habitacionBlanca.jpg';
import img7 from '../assets/images/InteriorBlanco.jpg';
import img8 from '../assets/images/paredAzul.jpg';
import img9 from '../assets/images/interior.jpg';
import img10 from '../assets/images/Airless2.jpg';
import img11 from '../assets/images/techo.jpg';
import img12 from '../assets/images/exteriorBlanco.jpg';
import img13 from '../assets/images/FrenteDeCasa.jpg';
import img14 from '../assets/images/TechoBlanco.jpg';
import img15 from '../assets/images/interiorPasillo.jpg';
import img16 from '../assets/images/exteriorPatio.jpg';


export default function GalleryPage() {
    const [filter, setFilter] = useState('Todos');
    const [selectedImage, setSelectedImage] = useState(null);

    const fotos = [
        { src: img1, title: "Pintura de Fachada", category: "Exterior" },
        { src: img2, title: "Pared y Muro Dorado", category: "Exterior" },
        { src: img3, title: "Impermeabilización de Techos", category: "Exterior" },
        { src: img4, title: "Recubrimiento Epóxico", category: "Pisos" },
        { src: img5, title: "Aplicación con Sistema Airless", category: "Airless" },
        { src: img6, title: "Habitación y Cielorrasos", category: "Interior" },
        { src: img7, title: "Living y Comedor", category: "Interior" },
        { src: img8, title: "Fachada Azul", category: "Exterior" },
        { src: img9, title: "Acabado de Interior Blanco", category: "Interior" },
        { src: img10, title: "Pintura en Altura con Airless", category: "Airless" },
        { src: img11, title: "Trabajo en Techos y Superficies", category: "Pisos" },
        { src: img12, title: "Pintura Exterior Completa", category: "Exterior" },
        { src: img13, title: "Frente de Casa Residencial", category: "Exterior" },
        { src: img14, title: "Techo Blanco Impermeabilizado", category: "Exterior" },
        { src: img15, title: "Interior pasillo", category: "Interior" },
        { src: img16, title: "Interior pasillo", category: "Exterior" },


    ];

    const categorias = ['Todos', 'Interior', 'Exterior', 'Pisos', 'Airless'];

    const fotosFiltradas = filter === 'Todos'
        ? fotos
        : fotos.filter(f => f.category === filter);

    return (
        <main className="min-h-screen bg-slate-50 pt-8 pb-16 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Botón Volver al inicio estilizado */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow-md border border-gray-200 text-xs sm:text-sm transition-all hover:-translate-x-0.5"
                    >
                        <i className="fa-solid fa-arrow-left text-xs"></i>
                        Volver al inicio
                    </Link>
                </div>

                {/* Header de la Galería Armónico */}
                <div className="text-center mb-8">
                    <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-1.5">
                        Portafolio Completo
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-brand-dark tracking-tight mb-2">
                        Galería de Obras Realizadas
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                        Explorá nuestro portafolio completo de proyectos y terminaciones en obras residenciales y comerciales.
                    </p>
                </div>

                {/* Filtros por categoría sutiles */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categorias.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                                filter === cat
                                    ? 'bg-brand-blue text-white shadow-xs'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grilla de Fotos estilizada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {fotosFiltradas.map((foto, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(foto.src)}
                            className="group relative overflow-hidden rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer h-56 md:h-64 bg-gray-100 border border-gray-200/60"
                        >
                            <img
                                src={foto.src}
                                alt={foto.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-0.5">
                                    {foto.category}
                                </span>
                                <h3 className="text-sm font-bold leading-tight">{foto.title}</h3>
                                <span className="text-xs text-gray-200 mt-2 flex items-center gap-1 font-medium">
                                    <i className="fa-solid fa-magnifying-glass-plus text-xs"></i> Ampliar
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Lightbox / Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-brand-blue transition cursor-pointer"
                        >
                            &times; Cerrar
                        </button>
                        <img
                            src={selectedImage}
                            alt="Trabajo ampliado"
                            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl object-contain"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}