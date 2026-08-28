'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import GalleryForm from '@/app/components/admin/GalleryForm';
import GalleryList from '@/app/components/admin/GalleryList';
import Toast from '@/app/components/common/Toast';
import { loginUser, logoutUser, updatePasswordUser } from '@/app/services/auth';

const AdminDashboard = () => {
    const router = useRouter();

    const [isAuth, setIsAuth] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        loginUser()
            .then(success => {
                setIsAuth(success);

                if(!success)
                    router.push('/login');
            })
    }, [router]);

    const handleLogout = async () => {
        await logoutUser();
        router.push('/login');
    };

    const handleOpenPasswordModal = () => {
        setPasswordError('');
        setPassword('');
        setPasswordConfirmation('');
        setIsPasswordModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        if (!isUpdatingPassword) {
            setIsPasswordModalOpen(false);
        }
    };

    const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password.length === 0) {
            setPasswordError('Ingresá una nueva contraseña');
            return;
        }

        if (password !== passwordConfirmation) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        setPasswordError('');
        setIsUpdatingPassword(true);

        try {
            const updated = await updatePasswordUser(password);

            if (!updated) {
                setPasswordError('No se pudo actualizar la contraseña');
                return;
            }

            setIsPasswordModalOpen(false);
            setPassword('');
            setPasswordConfirmation('');
            setToast({ message: 'Contraseña actualizada correctamente', type: 'success' });
        } catch {
            setPasswordError('No se pudo actualizar la contraseña');
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const handleToggleFeatured = (id: string) => {

    };

    if (!isAuth) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-10">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Panel de Control Tu Pintor CBA
                        </h1>
                        <p className="text-sm text-gray-500">Gestión de Galería de Trabajos</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={handleOpenPasswordModal}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer"
                        >
                            Cambiar Contraseña
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Formulario toma 5 columnas de 12 */}
                    <div className="lg:col-span-5">
                        <GalleryForm />
                    </div>

                    {/* Lista toma 7 columnas de 12 */}
                    <div className="lg:col-span-7">
                        <GalleryList
                            onToggleFeatured={handleToggleFeatured}
                        />
                    </div>
                </div>
            </div>

            {isPasswordModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="password-modal-title"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            handleClosePasswordModal();
                        }
                    }}
                >
                    <form
                        onSubmit={handleUpdatePassword}
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <h2 id="password-modal-title" className="text-xl font-bold text-slate-900">
                                Cambiar contraseña
                            </h2>
                            <button
                                type="button"
                                onClick={handleClosePasswordModal}
                                disabled={isUpdatingPassword}
                                aria-label="Cerrar modal"
                                className="text-2xl leading-none text-gray-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                &times;
                            </button>
                        </div>

                        <label htmlFor="new-password" className="mb-1 block text-sm font-medium text-slate-700">
                            Nueva contraseña
                        </label>
                        <div className="relative mb-4">
                            <input
                                id="new-password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="new-password"
                                className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                                required
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

                        <label htmlFor="password-confirmation" className="mb-1 block text-sm font-medium text-slate-700">
                            Confirmar contraseña
                        </label>
                        <div className="relative mb-2">
                            <input
                                id="password-confirmation"
                                type={isPasswordConfirmationVisible ? 'text' : 'password'}
                                value={passwordConfirmation}
                                onChange={(event) => setPasswordConfirmation(event.target.value)}
                                autoComplete="new-password"
                                className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setIsPasswordConfirmationVisible((visible) => !visible)}
                                aria-label={isPasswordConfirmationVisible ? 'Ocultar confirmación' : 'Mostrar confirmación'}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-slate-900"
                            >
                                {isPasswordConfirmationVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {passwordError && (
                            <p className="mb-4 text-sm text-red-600" role="alert">
                                {passwordError}
                            </p>
                        )}

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleClosePasswordModal}
                                disabled={isUpdatingPassword}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdatingPassword}
                                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isUpdatingPassword ? 'Actualizando...' : 'Actualizar contraseña'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
