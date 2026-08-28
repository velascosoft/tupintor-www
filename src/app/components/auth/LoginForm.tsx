'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Toast from '@/app/components/common/Toast';
import { loginUser } from '@/app/services/auth';

const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const router = useRouter();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isLogged = await loginUser(password);

        if (isLogged) {
            router.push('/admin');
            return;
        }

        setShowErrorToast(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-28 pb-12">
            {showErrorToast && (
                <Toast
                    message="Contraseña incorrecta"
                    type="error"
                    onClose={() => setShowErrorToast(false)}
                />
            )}
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-slate-900">Acceso al Panel</h2>
                <div className="relative mb-4">
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded border border-gray-300 p-2.5 pr-10 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                        placeholder="Contraseña"
                    />
                    <button
                        type="button"
                        onClick={() => setIsPasswordVisible((visible) => !visible)}
                        aria-label={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-slate-900"
                    >
                        {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-slate-900 text-white py-2.5 rounded font-medium hover:bg-slate-800 transition-colors"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
