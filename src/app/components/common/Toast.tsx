'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
    useEffect(() => {
        const timeoutId = window.setTimeout(onClose, 4000);

        return () => window.clearTimeout(timeoutId);
    }, [message, onClose]);

    return (
        <div
            className={`fixed right-4 top-24 z-[60] flex max-w-sm items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
                type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
            role="status"
            aria-live="polite"
        >
            <span>{message}</span>
            <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar notificación"
                className="rounded p-1 transition-colors hover:bg-white/15"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
