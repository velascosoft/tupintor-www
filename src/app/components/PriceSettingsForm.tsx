'use client';

import { useState, useEffect } from 'react';

export interface CotizadorPrices {
    interior: number;
    exterior: number;
    ceiling: number;
    door: number;
    window: number;
}

export const DEFAULT_PRICES: CotizadorPrices = {
    interior: 9000,
    exterior: 11000,
    ceiling: 9500,
    door: 25000,
    window: 20000,
};

export default function PriceSettingsForm() {
    const [prices, setPrices] = useState<CotizadorPrices>(DEFAULT_PRICES);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('cotizador_precios');
        if (stored) {
            try {
                setPrices(JSON.parse(stored));
            } catch (e) {
                console.error('Error al cargar precios', e);
            }
        }
    }, []);

    const handleChange = (key: keyof CotizadorPrices, value: string) => {
        setPrices((prev) => ({
            ...prev,
            [key]: Number(value) || 0,
        }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('cotizador_precios', JSON.stringify(prices));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="text-lg font-bold text-brand-dark mb-1">
                Precios del Cotizador
            </h3>
            <p className="text-gray-500 text-xs mb-4">
                Modificá las tarifas de referencia para los cálculos en la web.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Paredes Interior ($ / m²)
                        </label>
                        <input
                            type="number"
                            value={prices.interior}
                            onChange={(e) => handleChange('interior', e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Paredes Exterior ($ / m²)
                        </label>
                        <input
                            type="number"
                            value={prices.exterior}
                            onChange={(e) => handleChange('exterior', e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Cielorrasos ($ / m²)
                        </label>
                        <input
                            type="number"
                            value={prices.ceiling}
                            onChange={(e) => handleChange('ceiling', e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Puertas ($ / Unidad)
                        </label>
                        <input
                            type="number"
                            value={prices.door}
                            onChange={(e) => handleChange('door', e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Ventanas ($ / Unidad)
                        </label>
                        <input
                            type="number"
                            value={prices.window}
                            onChange={(e) => handleChange('window', e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand-blue"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                    Guardar Precios
                </button>

                {saved && (
                    <p className="text-xs text-emerald-600 text-center font-medium animate-fade-in">
                        ✓ Precios actualizados correctamente
                    </p>
                )}
            </form>
        </div>
    );
}