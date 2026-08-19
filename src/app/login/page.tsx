'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === 'admin123') {
            localStorage.setItem('isAdminLogged', 'true');
            router.push('/admin');
        } else {
            alert('Contraseña incorrecta');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-28 pb-12">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-slate-900">Acceso al Panel</h2>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded mb-4 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                    placeholder="Contraseña"
                />
                <button 
                    type="submit" 
                    className="w-full bg-slate-900 text-white py-2.5 rounded font-medium hover:bg-slate-800 transition-colors"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}