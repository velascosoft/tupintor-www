'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_PRICES, CotizadorPrices } from './PriceSettingsForm';

type ServiceType = 'paredes' | 'cielorrasos' | 'puertas' | 'ventanas';
type RoomType = 'living' | 'habitacion' | 'banio' | 'cocina' | 'fachada' | 'patio';
type WallLocation = 'interior' | 'exterior';

const PHONE_NUMBER = '+5493518500253';

// Tarifas base por m² / unidad
const PRICE_PER_M2_INTERIOR = 9000;
const PRICE_PER_M2_EXTERIOR = 11000;
const PRICE_PER_M2_CEILING = 9500;
const PRICE_PER_DOOR = 25000;
const PRICE_PER_WINDOW = 20000;




export default function QuoteCalculator() {
    const [service, setService] = useState<ServiceType>('paredes');
    const [location, setLocation] = useState<WallLocation>('interior');
    const [room, setRoom] = useState<RoomType>('living');
    const [width, setWidth] = useState<number | ''>('');
    const [length, setLength] = useState<number | ''>('');
    const [quantity, setQuantity] = useState<number | ''>(1);
    const [estimatedTotal, setEstimatedTotal] = useState<number | null>(null);

    const [prices, setPrices] = useState<CotizadorPrices>(DEFAULT_PRICES);

    const [height, setHeight] = useState<number | ''>(2.5);

    useEffect(() => {
        const stored = localStorage.getItem('cotizador_precios');
        if (stored) {
            try {
                setPrices(JSON.parse(stored));
            } catch (e) {
                console.error('Error cargando precios en cotizador', e);
            }
        }
    }, []);

    const calculateEstimate = (e: React.FormEvent) => {
        e.preventDefault();
        let total = 0;
        const w = Number(width) || 0;
        const l = Number(length) || 0;
        const qty = Number(quantity) || 0;

        if (service === 'paredes') {
            const h = Number(height) || 2.5;
            const wallArea = 2 * (w + l) * h;
            const rate = location === 'exterior' ? prices.exterior : prices.interior;
            total = wallArea * rate;
        } else if (service === 'cielorrasos') {
            total = (w * l) * prices.ceiling;
        } else if (service === 'puertas') {
            total = qty * prices.door;
        } else if (service === 'ventanas') {
            total = qty * prices.window;
        }

        setEstimatedTotal(Math.round(total));
    };

    const getWhatsAppLink = () => {
        let detail = '';
        if (service === 'paredes') {
            detail = `Paredes (${location.toUpperCase()}) - ${room} de ${width}x${length}m (alt: ${height}m)`;
        } else if (service === 'cielorrasos') {
            detail = `Cielorrasos de ${width}x${length}m`;
        } else {
            detail = `${quantity} ${service}`;
        }

        const message = `Hola Tu Pintor CBA! Usé el cotizador web para: ${detail}. Presupuesto estimado: $${estimatedTotal?.toLocaleString('es-AR')} ARS. ¿Quisiera coordinar una visita técnica?`;
        return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    };


    return (
        <div className="w-full p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="text-xl font-bold text-brand-dark text-center mb-1">
                Calculá en forma online tu presupuesto
            </h3>
            <p className="text-gray-500 text-xs text-center mb-6">
                Indicá las medidas o cantidades para obtener una estimación aproximada.
            </p>

            <form onSubmit={calculateEstimate} className="space-y-5">
                {/* Paso 1: Tipo de Servicio */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 text-center mb-2.5">
                        ¿Qué necesita pintar?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                            { id: 'paredes', label: 'Paredes', icon: '🎨' },
                            { id: 'cielorrasos', label: 'Cielorrasos', icon: '🏠' },
                            { id: 'puertas', label: 'Puertas', icon: '🚪' },
                            { id: 'ventanas', label: 'Ventanas', icon: '🪟' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setService(item.id as ServiceType);
                                    setEstimatedTotal(null);
                                }}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${service === item.id
                                    ? 'border-brand-blue bg-blue-50 text-brand-blue font-bold shadow-xs'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-xs">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Paso 2: Configuración para Paredes */}
                {service === 'paredes' && (
                    <div className="space-y-4 pt-3 border-t border-gray-100">
                        {/* Ubicación: Interior / Exterior */}
                        <div className="flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setLocation('interior')}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${location === 'interior'
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                🏠 Interior
                            </button>
                            <button
                                type="button"
                                onClick={() => setLocation('exterior')}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${location === 'exterior'
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                🌿 Exterior / Fachada
                            </button>
                        </div>

                        {/* Ambientes */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {(location === 'interior'
                                ? [
                                    { id: 'living', label: 'Living' },
                                    { id: 'habitacion', label: 'Habitación' },
                                    { id: 'banio', label: 'Baño' },
                                    { id: 'cocina', label: 'Cocina' },
                                ]
                                : [
                                    { id: 'fachada', label: 'Fachada Frente' },
                                    { id: 'patio', label: 'Patio / Galería' },
                                ]
                            ).map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setRoom(item.id as RoomType)}
                                    className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all ${room === item.id
                                        ? 'border-slate-800 bg-slate-900 text-white font-semibold'
                                        : 'border-gray-200 text-gray-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Medidas: Ancho, Largo y Altura */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Ancho (m)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0.5"
                                    required
                                    placeholder="Ej: 4.0"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : '')}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Largo (m)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0.5"
                                    required
                                    placeholder="Ej: 3.5"
                                    value={length}
                                    onChange={(e) => setLength(e.target.value ? Number(e.target.value) : '')}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Altura techo (m)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="1.5"
                                    max="10"
                                    required
                                    placeholder="Ej: 2.5"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {service === 'cielorrasos' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Ancho (m)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0.5"
                                required
                                placeholder="Ej: 3.0"
                                value={width}
                                onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : '')}
                                className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Largo (m)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0.5"
                                required
                                placeholder="Ej: 4.0"
                                value={length}
                                onChange={(e) => setLength(e.target.value ? Number(e.target.value) : '')}
                                className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                            />
                        </div>
                    </div>
                )}

                {(service === 'puertas' || service === 'ventanas') && (
                    <div className="pt-3 border-t border-gray-100">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Cantidad de {service}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="50"
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer text-xs sm:text-sm shadow-xs"
                >
                    Calcular presupuesto
                </button>
            </form>

            {/* Resultado con estilo unificado */}
            {estimatedTotal !== null && (
                <div className="mt-5 p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-center space-y-3">
                    <div>
                        <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">
                            Presupuesto Estimado
                        </p>
                        <p className="text-2xl font-bold text-brand-dark my-0.5">
                            ${estimatedTotal.toLocaleString('es-AR')} ARS
                        </p>
                        <p className="text-[11px] text-gray-500">
                            *Precio sujeto a verificación técnica en obra.
                        </p>
                    </div>

                    <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                    >
                        <i className="fa-brands fa-whatsapp text-green-400 text-sm"></i>
                        <span>Enviar este presupuesto por WhatsApp</span>
                    </a>
                </div>
            )}
        </div>
    );
}